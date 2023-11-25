import { useRouter } from "next/router";
import { getTherapists } from "..";
import { Terapeutti } from "@/types";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import {
  parseEmail,
  splitEmails,
  splitHomepages,
  splitPhoneNumbers,
} from "@/helperFunctions";
import { HomePageLink } from "@/components/HomePageLink";
import { PuhelinCell } from "@/components/PuhelinCell";
import { SähköpostiCell } from "@/components/SähköpostiCell";
import Head from "next/head";
import { TextDetail } from "@/components/TextDetail";
import { MultiLineChip } from "@/components/MultiLineChip";
import Error from "next/error";

export const getStaticPaths = async () => {
  const therapists = await getTherapists();
  return {
    paths: therapists.map((t) => `/${t.Etunimi} ${t.Sukunimi}`),
    fallback: true,
  };
};

export async function getStaticProps({ params }: { params: any }) {
  const { nimi }: { nimi: string } = params;
  const therapists = await getTherapists();
  const foundTerapeutti = therapists.find(
    (t: Terapeutti) => `${t.Etunimi} ${t.Sukunimi}` === nimi
  );
  return {
    props: {
      terapeutti: foundTerapeutti,
    },
  };
}

export default function TerapeuttiPage({
  terapeutti,
}: {
  terapeutti: Terapeutti | undefined;
}) {
  if (terapeutti) {
    return (
      <>
        <Head>
          <title>{`${terapeutti.Etunimi} ${terapeutti.Sukunimi}`}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Container
          maxWidth="lg"
          sx={{
            padding: 2,
          }}
        >
          <Paper elevation={5}>
            <Box
              sx={{
                padding: 2,
              }}
            >
              <Stack
                sx={{
                  gap: 1,
                }}
                flexWrap="wrap"
                direction="column"
                divider={<Divider orientation="horizontal" flexItem />}
              >
                <Typography textAlign="center" variant="h5">
                  {terapeutti.Etunimi} {terapeutti.Sukunimi}
                </Typography>
                {terapeutti.Kieli && (
                  <TextDetail title="Kieli" content={terapeutti.Kieli} />
                )}
                {terapeutti.Suuntaus && (
                  <TextDetail title="Suuntaus" content={terapeutti.Suuntaus} />
                )}
                {terapeutti.Kohderyhmä && (
                  <TextDetail
                    title="Kohderyhmä"
                    content={terapeutti.Kohderyhmä}
                  />
                )}

                {terapeutti.Kela && (
                  <TextDetail title="Kela" content={terapeutti.Kela} />
                )}

                {terapeutti.Lisätiedot && (
                  <TextDetail
                    title="Lisätiedot"
                    content={terapeutti.Lisätiedot}
                  />
                )}
                {terapeutti.Kelalisätiedot && (
                  <TextDetail
                    title="Kela lisätiedot"
                    content={terapeutti.Kelalisätiedot}
                  />
                )}
                {terapeutti.Koulutus && (
                  <TextDetail title="Koulutus" content={terapeutti.Koulutus} />
                )}
                {terapeutti.Tilaa && (
                  <TextDetail title="Tilaa" content={terapeutti.Tilaa} />
                )}
                {terapeutti.Ajanvaraus && (
                  <TextDetail
                    title="Ajanvaraus"
                    content={terapeutti.Ajanvaraus}
                  />
                )}
                {terapeutti.Vastaanotot && (
                  <>
                    <Typography variant="h5">Vastaanotot</Typography>
                    <Grid spacing={3} direction="row" flexWrap="wrap" container>
                      {terapeutti.Vastaanotot.map((vastaanotto) => (
                        <Grid
                          key={vastaanotto}
                          xs={12 / terapeutti.Vastaanotot.length}
                          item
                        >
                          {vastaanotto.trim()}
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
                <Stack
                  sx={{
                    gap: 1,
                  }}
                  direction="row"
                  flexWrap="wrap"
                >
                  {terapeutti.Sähköposti &&
                    splitEmails(terapeutti).map((email) => {
                      const parsedEmail = parseEmail(terapeutti, email);
                      return (
                        <MultiLineChip
                          key={email}
                          icon={<EmailIcon />}
                          label={
                            <a href={`mailto:${parsedEmail}`}>{parsedEmail}</a>
                          }
                        />
                      );
                    })}
                  {terapeutti.Puhelin &&
                    splitPhoneNumbers(terapeutti.Puhelin).map((nro) => {
                      return (
                        <MultiLineChip
                          key={nro}
                          icon={<PhoneIcon />}
                          label={<a href={`tel:${nro}`}>{nro}</a>}
                        />
                      );
                    })}
                  {terapeutti.Kotisivut &&
                    splitHomepages(terapeutti.Kotisivut).map((kotisivu) => (
                      <MultiLineChip
                        icon={<HomeIcon />}
                        key={kotisivu}
                        label={<HomePageLink url={kotisivu} />}
                      />
                    ))}
                  <MultiLineChip
                    icon={<LocalHospitalIcon />}
                    key={terapeutti.href}
                    label={<HomePageLink url={terapeutti.href!} />}
                  />
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </>
    );
  }
  return <Error statusCode={404} />;
}

import { useRouter } from "next/router";
import { getTherapists } from "..";
import { Terapeutti } from "@/types";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HomeIcon from "@mui/icons-material/Home";
import { parseEmail, parseEmails, trimPhoneNumber } from "@/helperFunctions";
import { HomePageLink } from "@/components/HomePageLink";
import { PuhelinCell } from "@/components/PuhelinCell";
import { SähköpostiCell } from "@/components/SähköpostiCell";
import Head from "next/head";
import { TextDetail } from "@/components/TextDetail";
import { MultiLineChip } from "@/components/MultiLineChip";
import Error from "next/error";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const getStaticPaths = async () => {
  const therapists = await getTherapists();
  return {
    paths: therapists.map(
      (t) => `/${t.Sukunimi.toLowerCase()}-${t.Etunimi.toLowerCase()}`
    ),
    fallback: true,
  };
};

export async function getStaticProps({ params }: { params: any }) {
  const { nimi }: { nimi: string } = params;
  const therapists = await getTherapists();
  const foundTerapeutti = therapists.find(
    (t: Terapeutti) =>
      `${t.Sukunimi.toLowerCase()}-${t.Etunimi.toLowerCase()}` === nimi
  );
  return {
    props: {
      terapeutti: foundTerapeutti || null,
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
          <title>{`${terapeutti.Sukunimi} ${terapeutti.Etunimi}`}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Container maxWidth="md" disableGutters>
          <AppBar
            sx={{
              displayPrint: "none",
            }}
            position="static"
          >
            <Toolbar>
              <Typography
                sx={{
                  flexGrow: 1,
                }}
                variant="h4"
              >
                {terapeutti.Sukunimi} {terapeutti.Etunimi}
              </Typography>
              <IconButton onClick={() => window.print()} color="inherit">
                <PrintIcon />
              </IconButton>
              <IconButton onClick={() => window.close()} color="inherit">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Paper elevation={3}>
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
                <Typography
                  sx={{
                    displayPrint: "block",
                    display: "none",
                  }}
                  variant="h4"
                >
                  {terapeutti.Sukunimi} {terapeutti.Etunimi}
                </Typography>
                {terapeutti.Ammattinimike &&
                  terapeutti.Ammattinimike.trim() && (
                    <TextDetail
                      title="Ammattinimike"
                      content={terapeutti.Ammattinimike}
                    />
                  )}
                {terapeutti.Pätevyys.length && (
                  <TextDetail
                    title="Pätevyys"
                    content={terapeutti.Pätevyys.join(", ")}
                  />
                )}
                {/* {terapeutti.Kieli && (
                  <TextDetail title="Kieli" content={terapeutti.Kieli} />
                )} */}
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
                    terapeutti.Sähköposti.map((email) => {
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
                    terapeutti.Puhelin.map((nro) => {
                      return (
                        <MultiLineChip
                          key={nro}
                          icon={<PhoneIcon />}
                          label={
                            <a href={`tel:${trimPhoneNumber(nro)}`}>{nro}</a>
                          }
                        />
                      );
                    })}
                  {terapeutti.Kotisivut &&
                    terapeutti.Kotisivut.map((kotisivu) => (
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

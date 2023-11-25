import { useRouter } from "next/router";
import { getTherapists } from "..";
import { Terapeutti } from "@/types";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import HomeIcon from "@mui/icons-material/Home";
import { parseEmail } from "@/helperFunctions";
import { HomePageLink } from "@/components/HomePageLink";
import { PuhelinCell } from "@/components/PuhelinCell";
import { SähköpostiCell } from "@/components/SähköpostiCell";
import Head from "next/head";
import { TextDetail } from "@/components/TextDetail";

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
  terapeutti: Terapeutti;
}) {
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
            <Stack spacing={2}>
              <Typography textAlign="center" variant="h5">
                {terapeutti.Etunimi} {terapeutti.Sukunimi}
              </Typography>
              <Stack
                sx={{
                  gap: 1,
                }}
                flexWrap="wrap"
                direction="column"
              >
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
              </Stack>
              <Stack spacing={1}>
                <Stack
                  flexWrap="wrap"
                  direction="row"
                  sx={{
                    gap: 1,
                  }}
                >
                  {/* <Chip label={`Tilaa: ${terapeutti.Tilaa}`} /> */}
                  {terapeutti.Sähköposti && (
                    <Chip
                      icon={<EmailIcon />}
                      label={<SähköpostiCell terapeutti={terapeutti} />}
                    />
                  )}
                  {terapeutti.Puhelin && (
                    <Chip
                      icon={<PhoneIcon />}
                      label={<PuhelinCell terapeutti={terapeutti} />}
                    />
                  )}
                  {terapeutti.Kotisivut && (
                    <Chip
                      icon={<HomeIcon />}
                      label={<HomePageLink url={terapeutti.Kotisivut} />}
                    />
                  )}
                  {terapeutti.Ajanvaraus && (
                    <Chip label={terapeutti.Ajanvaraus} />
                  )}
                  <Chip label={terapeutti.Paikkakunta} />
                  {terapeutti.Vastaanotot.map((vastaanotto) => (
                    <Chip key={vastaanotto} label={vastaanotto.trim()} />
                  ))}
                </Stack>
              </Stack>
              <Divider />
              <Stack
                direction="column"
                sx={{
                  gap: 3,
                }}
                flexWrap="wrap"
              >
                <TextDetail
                  title="Lisätiedot"
                  content={terapeutti.Lisätiedot}
                />
                <TextDetail
                  title="Kela lisätiedot"
                  content={terapeutti.Kelalisätiedot}
                />
                <TextDetail title="Koulutus" content={terapeutti.Koulutus} />
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

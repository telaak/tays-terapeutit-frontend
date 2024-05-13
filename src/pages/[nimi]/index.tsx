import {
  AppBar,
  Box,
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
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { parseEmail, trimPhoneNumber } from "@/helperFunctions";
import { HomePageLink } from "@/components/HomePageLink";
import Head from "next/head";
import { TextDetail } from "@/components/TextDetail";
import { MultiLineChip } from "@/components/MultiLineChip";
import Error from "next/error";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import { prisma } from "@/prisma";
import { Therapist } from "@prisma/client";

export const getStaticPaths = async () => {
  const therapists = await prisma.therapist.findMany();
  return {
    paths: therapists.map(
      (t) => `/${t.lastName.toLowerCase()}-${t.firstName.toLowerCase()}`
    ),
    fallback: true,
  };
};

export async function getStaticProps({ params }: { params: any }) {
  const { nimi }: { nimi: string } = params;
  const therapists = await prisma.therapist.findMany();
  const foundTherapist = therapists.find(
    (t: Therapist) =>
      `${t.lastName.toLowerCase()}-${t.firstName.toLowerCase()}` === nimi
  );
  return {
    props: {
      therapist: foundTherapist || null,
    },
  };
}

export default function TherapistPage({
  therapist,
}: {
  therapist: Therapist | undefined;
}) {
  if (therapist) {
    return (
      <>
        <Head>
          <title>{`${therapist.lastName} ${therapist.firstName}`}</title>
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
                {therapist.lastName} {therapist.firstName}
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
                  {therapist.lastName} {therapist.firstName}
                </Typography>
                {therapist.jobTitle && therapist.jobTitle.trim() && (
                  <TextDetail
                    title="Ammattinimike"
                    content={therapist.jobTitle}
                  />
                )}
                {therapist.education.length && (
                  <TextDetail
                    title="Koulutus"
                    content={therapist.education.join(", ")}
                  />
                )}
                {therapist.languages && (
                  <TextDetail
                    title="Kieli"
                    content={therapist.languages.join(", ")}
                  />
                )}
                {therapist.targetGroups && (
                  <TextDetail
                    title="Kohderyhmä"
                    content={therapist.targetGroups.join(", ")}
                  />
                )}

                {therapist.additionalInfo && (
                  <TextDetail
                    title="Lisätiedot"
                    content={therapist.additionalInfo.join(", ")}
                  />
                )}
                {therapist.extraInfo && (
                  <TextDetail
                    title="Yhteydenotto"
                    content={therapist.extraInfo.join(", ")}
                  />
                )}

                {therapist.spaceAvailable && (
                  <TextDetail
                    title="Tilaa"
                    content={therapist.spaceAvailable}
                  />
                )}
                {therapist.reception && (
                  <>
                    <Typography variant="h5">Vastaanotot</Typography>
                    <Grid spacing={3} direction="row" flexWrap="wrap" container>
                      {therapist.reception.map((reception) => (
                        <Grid
                          key={reception}
                          xs={12 / therapist.reception.length}
                          item
                        >
                          {reception.trim()}
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
                  {therapist.email &&
                    therapist.email.split(",").map((email) => {
                      const parsedEmail = parseEmail(therapist, email);
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
                  {therapist.phoneNumber &&
                    therapist.phoneNumber.split(",").map((nro) => {
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
                  {/* {terapeutti.Kotisivut &&
                    terapeutti.Kotisivut.map((kotisivu) => (
                      <MultiLineChip
                        icon={<HomeIcon />}
                        key={kotisivu}
                        label={<HomePageLink url={kotisivu} />}
                      />
                    ))} */}
                  <MultiLineChip
                    icon={<LocalHospitalIcon />}
                    key={therapist.href}
                    label={<HomePageLink url={`https://pirha.fi${therapist.href}`} />}
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

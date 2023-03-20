import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_TableInstance,
} from "material-react-table";
import Head from "next/head";
import { useMemo } from "react";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { MRT_Localization_FI } from "@/fi-i18";

type Terapeutti = {
  Etunimi: string;
  Sukunimi: string;
  Tilaa: string;
  Paikkakunta: string;
  Kohderyhmä: string;
  Vastaanotot: string[];
  Ajanvaraus: string;
  Kela: string;
  Kelalisätiedot: string;
  Kieli: string;
  Kotisivut: string;
  Koulutus: string;
  Lisätiedot: string;
  Puhelin: string;
  Suuntaus: string;
  Sähköposti: string;

  href?: string;
};

export const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const getTherapists = async (): Promise<Terapeutti[]> => {
  const res = await axios.get(`${apiUrl}/therapists`);
  return res.data;
};

export const emailRegex =
  /^(?!\.)((?!.*\.{2})[a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\.!#$%&'*+-/=?^_`{|}~\-\d]+)@(?!\.)([a-zA-Z0-9\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF\-\.\d]+)((\.([a-zA-Z\u0080-\u00FF\u0100-\u017F\u0180-\u024F\u0250-\u02AF\u0300-\u036F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u10A0-\u10FF\u1100-\u11FF\u1200-\u137F\u1380-\u139F\u13A0-\u13FF\u1400-\u167F\u1680-\u169F\u16A0-\u16FF\u1700-\u171F\u1720-\u173F\u1740-\u175F\u1760-\u177F\u1780-\u17FF\u1800-\u18AF\u1900-\u194F\u1950-\u197F\u1980-\u19DF\u19E0-\u19FF\u1A00-\u1A1F\u1B00-\u1B7F\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u1E00-\u1EFF\u1F00-\u1FFF\u20D0-\u20FF\u2100-\u214F\u2C00-\u2C5F\u2C60-\u2C7F\u2C80-\u2CFF\u2D00-\u2D2F\u2D30-\u2D7F\u2D80-\u2DDF\u2F00-\u2FDF\u2FF0-\u2FFF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3130-\u318F\u3190-\u319F\u31C0-\u31EF\u31F0-\u31FF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FFF\uA000-\uA48F\uA490-\uA4CF\uA700-\uA71F\uA800-\uA82F\uA840-\uA87F\uAC00-\uD7AF\uF900-\uFAFF]){2,63})+)$/i;

export async function getStaticProps() {
  const therapists = await getTherapists();

  return {
    props: {
      therapists,
    },
  };
}

const parseEmails = (table: MRT_TableInstance<Terapeutti>) => {
  const emails = table.getSelectedRowModel().flatRows.map((row) => {
    const therapist = row.original as Terapeutti;
    const parsedEmail = therapist.Sähköposti.replace(
      /etunimi|etu-nimi/,
      therapist.Etunimi
    )
      .replace(/sukunimi|suku-nimi/, therapist.Sukunimi)
      .replace("(at)", "@")
      .toLowerCase();
    return parsedEmail;
  });
  const filteredEmails = emails.filter((e) => emailRegex.test(e));
  const diff = emails.filter((e) => !filteredEmails.includes(e));
  if (diff.length) {
    console.log(diff);
  }
  return filteredEmails;
};

const isSelected = (table: MRT_TableInstance<Terapeutti>) => {
  if (table.getIsAllRowsSelected()) {
    return true;
  } else if (table.getIsSomeRowsSelected()) {
    return true;
  }
  return false;
};

export default function Table({ therapists }: { therapists: Terapeutti[] }) {
  const columns = useMemo<MRT_ColumnDef<Terapeutti>[]>(
    () => [
      {
        accessorFn: (terapeutti) =>
          `${terapeutti.Etunimi} ${terapeutti.Sukunimi}`,
        header: "Nimi",
        id: "kokoNimi",
        size: 60,
      },
      {
        accessorKey: "Suuntaus",
        header: "Suuntaus",
        size: 60,
      },
      {
        accessorKey: "Tilaa",
        header: "Tilaa",
        size: 60,
      },
      {
        accessorKey: "Paikkakunta",
        header: "Paikka",
        size: 60,
      },
      {
        accessorKey: "Kohderyhmä",
        header: "Kohde",
        size: 50,
      },
      {
        accessorFn: (row) => row.Vastaanotot.join(", "),
        id: "Vastaanotot",
        header: "Vastaanotot",
        size: 50,
      },
      {
        accessorKey: "Kela",
        header: "Kela",
        size: 50,
      },
      {
        accessorKey: "Kelalisätiedot",
        header: "Kela lisätiedot",
        size: 50,
      },
      {
        accessorKey: "Kieli",
        header: "Kieli",
        size: 50,
      },
      {
        accessorKey: "Kotisivut",
        header: "Kotisivut",
        size: 50,
      },
      {
        accessorKey: "Koulutus",
        header: "Koulutus",
        size: 50,
      },
      {
        accessorKey: "Lisätiedot",
        header: "Lisätiedot",
        size: 50,
      },
      {
        accessorKey: "Puhelin",
        header: "Puhelin",
        size: 50,
      },
      {
        accessorKey: "Sähköposti",
        header: "Sähköposti",
        size: 50,
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>TAYS Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MaterialReactTable
        muiTableContainerProps={{ className: "table-container" }}
        muiSearchTextFieldProps={{sx: {
          width: '10em'
        }}}
        columns={columns}
        data={therapists}
        enableRowSelection
        enableGrouping
        enableColumnFilterModes
        enableStickyHeader
        positionToolbarAlertBanner="none"
        enablePagination={false}
        enableBottomToolbar={false}
        enableFullScreenToggle={false}
        localization={MRT_Localization_FI}
        initialState={{
          showGlobalFilter: true,
          columnVisibility: {
            Vastaanotot: false,
            Ajavanraus: false,
            Kela: false,
            Kelalisätiedot: false,
            Kieli: false,
            Kotisivut: false,
            Koulutus: false,
            Lisätiedot: false,
            Puhelin: false,
            Sähköposti: false,
          },
        }}
        renderTopToolbarCustomActions={({ table }) => {
          const sendEmail = () => {
            const filteredEmails = parseEmails(table);
            let mail = document.createElement("a");
            mail.href = `mailto:?bcc=${filteredEmails.join(",")}`;
            mail.target = "_blank";
            mail.click();
          };
          const copyEmails = () => {
            const filteredEmails = parseEmails(table);
            navigator.clipboard.writeText(filteredEmails.join(","));
          };
          return (
            <Stack direction={"row"} spacing={1}>
              <Tooltip title={"Lähetä sähköposti"}>
                <span>
                  <Button
                    disabled={!isSelected(table)}
                    color="primary"
                    onClick={sendEmail}
                    variant="contained"
                    startIcon={<EmailIcon />}
                    sx={{
                      width: "80px",
                    }}
                  >
                    ({table.getSelectedRowModel().flatRows.length})
                  </Button>
                </span>
              </Tooltip>
              <Tooltip title={"Kopioi osoitteet"}>
                <span>
                  <Button
                    disabled={!isSelected(table)}
                    color="primary"
                    onClick={copyEmails}
                    variant="contained"
                    startIcon={<ContentCopyIcon />}
                    sx={{
                      width: "80px",
                    }}
                  >
                    ({table.getSelectedRowModel().flatRows.length})
                  </Button>
                </span>
              </Tooltip>
            </Stack>
          );
        }}
        renderDetailPanel={({ row }) => {
          const terapeutti = row.original;
          return (
            <Grid container spacing={3}>
              <Grid item lg={2} md={4} xs={6}>
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Vastaanotot.join(", ")}
                      primary="Vastaanotot"
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Ajanvaraus}
                      primary="Ajanvaraus"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item lg={2} md={4} xs={6}>
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Puhelin}
                      primary="Puhelinnumero"
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Sähköposti}
                      primary="Sähköposti"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item lg={2} md={4} xs={6}>
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Koulutus}
                      primary="Koulutus"
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Kieli}
                      primary="Kieli"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item lg={2} md={4} xs={6}>
                <List>
                  <ListItem disablePadding>
                    <ListItemText secondary={terapeutti.Kela} primary="Kela" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Kelalisätiedot}
                      primary="Kela lisätiedot"
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item lg={2} md={4} xs={12}>
                <List>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Lisätiedot}
                      primary="Lisätiedot"
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={terapeutti.Kotisivut}
                      primary="Kotisivut"
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText
                      secondary={
                        <a href={terapeutti.href}>{terapeutti.href}</a>
                      }
                      primary="TAYS-sivu"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          );
        }}
      />
    </>
  );
}

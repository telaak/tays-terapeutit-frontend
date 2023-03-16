import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import Head from "next/head";
import { useMemo } from "react";

type Terapeutti = {
  Etunimi: string;
  Sukunimi: string;
  Tilaa: string;
  Paikkakunta: string;
  Kohderyhmä: string;
  Vastaanotot: string;
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

export const axiosOptions: AxiosRequestConfig = {
  // withCredentials: true,
};

export const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const useGetTherapists = () => {
  return useQuery({ queryKey: ["therapists"], queryFn: getTherapists });
};

export const getTherapists = async (): Promise<any> => {
  const res = await axios.get(`${apiUrl}/therapists`, axiosOptions);
  return res.data;
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["therapists"], getTherapists);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Table() {
  const therapists = useGetTherapists();

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
        header: "Paikkakunta",
        size: 60,
      },
      {
        accessorKey: "Kohderyhmä",
        header: "Kohderyhmä",
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
        columns={columns}
        data={therapists.data}
       // enableRowSelection
        renderDetailPanel={({ row }) => {
          const terapeutti = row.original;
          return (
            <Grid container spacing={3}>
                <Grid item lg={2} md={4} xs={6}>
                  <List>
                    <ListItem disablePadding>
                      <ListItemText
                        secondary={terapeutti.Vastaanotot}
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
                      <ListItemText
                        secondary={terapeutti.Kela}
                        primary="Kela"
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        secondary={terapeutti.Kelalisätiedot}
                        primary="Kela lisätiedot"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item lg={2} md={4} xs={6}>
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
                  </List>
                </Grid>
            </Grid>
          );
        }}
      />
    </>
  );
}

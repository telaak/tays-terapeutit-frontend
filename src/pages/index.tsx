import axios from "axios";
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TableContainer,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_FI } from "@/fi-i18";
import { Terapeutti } from "@/types";
import { Stack, AppBar, Toolbar, Paper, Box } from "@mui/material";
import { CopyEmailsButton } from "../../components/CopyEmailsButton";
import { SendEmailsButton } from "../../components/SendEmailsButton";
import { CardDetailPanel } from "../../components/CardDetailPanel";
import { HomePageLink } from "../../components/HomePageLink";
import { SähköpostiCell } from "../../components/SähköpostiCell";
import { PuhelinCell } from "../../components/PuhelinCell";

export const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const getTherapists = async (): Promise<Terapeutti[]> => {
  const res = await axios.get(`${apiUrl}/therapists`);
  return res.data;
};

export async function getStaticProps() {
  const therapists = await getTherapists();

  return {
    props: {
      therapists,
    },
  };
}

export default function Table({ therapists }: { therapists: Terapeutti[] }) {
  const columns = useMemo<MRT_ColumnDef<Terapeutti>[]>(
    () => [
      {
        accessorFn: (terapeutti) =>
          `${terapeutti.Etunimi} ${terapeutti.Sukunimi}`,
        header: "Nimi",
        id: "kokoNimi",
        size: 80,
        filterVariant: "autocomplete",
      },
      {
        accessorKey: "Suuntaus",
        header: "Suuntaus",
        size: 120,
      },
      {
        accessorKey: "Tilaa",
        header: "Tilaa",
        size: 100,
        filterVariant: "autocomplete",
      },
      {
        accessorKey: "Paikkakunta",
        header: "Paikka",
        size: 100,
        filterVariant: "autocomplete",
      },
      {
        accessorKey: "Kohderyhmä",
        header: "Kohde",
        size: 100,
        filterVariant: "autocomplete",
      },
      {
        accessorFn: (row) => row.Vastaanotot.map((s) => s.trim()).join(", "),
        id: "Vastaanotot",
        header: "Vastaanotot",
        size: 150,
        Cell: ({ row }) => (
          <Stack spacing={2}>
            {row.original.Vastaanotot.map((vastaanotto) => (
              <span key={vastaanotto}>{vastaanotto.trim()}</span>
            ))}
          </Stack>
        ),
      },
      {
        accessorKey: "Kela",
        header: "Kela",
        size: 150,
      },
      {
        accessorKey: "Kelalisätiedot",
        header: "Kela lisätiedot",
        size: 150,
      },
      {
        accessorKey: "Kieli",
        header: "Kieli",
        size: 120,
        filterVariant: "autocomplete",
      },
      {
        accessorKey: "Koulutus",
        header: "Koulutus",
        size: 200,
      },
      {
        accessorKey: "Lisätiedot",
        header: "Lisätiedot",
        size: 120,
      },
      {
        accessorKey: "Ajanvaraus",
        header: "Ajanvaraus",
        size: 130,
      },
      {
        accessorKey: "Sähköposti",
        header: "Sähköposti",
        size: 155,
        accessorFn: (row) => (row.Sähköposti ? true : false),
        Cell: ({ row }) => <SähköpostiCell row={row} />,
        filterVariant: "checkbox",
        muiTableBodyCellProps: {
          sx: {
            wordBreak: "break-all",
            border: "1px solid rgba(210, 210, 210, 1)",
          },
        },
      },
      {
        accessorKey: "Puhelin",
        header: "Puhelin",
        size: 100,
        accessorFn: (row) => (row.Puhelin ? true : false),
        Cell: ({ row }) => <PuhelinCell row={row} />,
        filterVariant: "checkbox",
      },
      {
        accessorKey: "Kotisivut",
        header: "Kotisivut",
        size: 120,
        accessorFn: (row) => (row.Kotisivut ? true : false),
        Cell: ({ row }) => <HomePageLink url={row.original.Kotisivut} />,
        filterVariant: "checkbox",
        muiTableBodyCellProps: {
          sx: {
            wordBreak: "break-all",
            border: "1px solid rgba(210, 210, 210, 1)",
          },
        },
      },
    ],
    []
  );

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pagination.pageIndex]);

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    enableRowSelection: true,
    enableFacetedValues: true,
    localization: MRT_Localization_FI,
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(210, 210, 210, 1)",
      },
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      columnVisibility: {
        Vastaanotot: true,
        Ajanvaraus: false,
        Kela: false,
        Kohderyhmä: false,
        Paikkakunta: false,
        Kelalisätiedot: true,
        Kieli: false,
        Kotisivut: false,
        Koulutus: false,
        Lisätiedot: false,
        Puhelin: true,
        Sähköposti: true,
      },
    },
    muiTableContainerProps: {
      className: "table-container",
    },
    state: { pagination },
    onPaginationChange: setPagination,
    renderDetailPanel: ({ row }) => <CardDetailPanel row={row} />,
  });

  return (
    <>
      <Head>
        <title>TAYS Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack>
        <AppBar color="primary" position="fixed">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction={"row"} spacing={1}>
              <Paper>
                <CopyEmailsButton table={table} />
              </Paper>
              <Paper>
                <SendEmailsButton table={table} />
              </Paper>
            </Stack>
            <Paper>
              <MRT_GlobalFilterTextField table={table} />
            </Paper>
            <Paper>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />
              </Box>
            </Paper>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <MRT_TablePagination table={table} />
      </Stack>
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </>
  );
}

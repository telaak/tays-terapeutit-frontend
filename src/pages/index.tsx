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
import {
  Stack,
  AppBar,
  Toolbar,
  Paper,
  Box,
  IconButton,
  Grid,
} from "@mui/material";
import { CopyEmailsButton } from "../components/CopyEmailsButton";
import { SendEmailsButton } from "../components/SendEmailsButton";
import { EmailCell } from "../components/EmailCell";
import { PhoneCell } from "../components/PuhelinCell";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getTherapists, prisma } from "@/prisma";
import { Therapist } from "@prisma/client";
import { HomepageCell } from "@/components/HomepageCell";
import axios from "axios";

export async function getStaticProps() {
  const therapists: Therapist[] = (
    await axios.get(`${process.env.BACKEND_URL}/therapist`)
  ).data;

  return {
    props: {
      therapists,
    },
  };
}

export default function Table({ therapists }: { therapists: Therapist[] }) {
  const columns = useMemo<MRT_ColumnDef<Therapist>[]>(
    () => [
      {
        accessorFn: (therapist) =>
          `${therapist.lastName} ${therapist.firstName} `,
        header: "Nimi",
        id: "Nimi",
        size: 80,
        filterVariant: "autocomplete",
        Cell: ({ row }) => (
          <Grid
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            container
          >
            <Grid item xs={10}>
              {`${row.original.lastName} ${row.original.firstName} `}
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => {
                  window.open(
                    `/${row.original.lastName.toLowerCase()}-${row.original.firstName.toLowerCase()}`
                  );
                }}
              >
                <OpenInNewIcon />
              </IconButton>
            </Grid>
          </Grid>
        ),
      },
      {
        id: "education",
        accessorFn: (row) => row.education.join(", "),
        header: "Koulutus",
        size: 120,
        Cell: ({ row }) => (
          <Stack spacing={2}>
            {row.original.jobTitle && <Box>{row.original.jobTitle}</Box>}
            <Box>{row.original.education.join(", ")}</Box>
          </Stack>
        ),
      },
      {
        accessorKey: "spaceAvailable",
        header: "Tilaa",
        size: 100,
        filterVariant: "autocomplete",
      },
      {
        accessorFn: (row) => row.targetGroups.join(", "),
        header: "Kohderyhmä",
        accessorKey: "targetGroups",
        size: 100,
        filterVariant: "autocomplete",
      },
      {
        accessorFn: (row) => row.reception.join(", "),
        id: "Vastaanotot",
        header: "Vastaanotot",
        size: 150,
        Cell: ({ row }) => (
          <Stack>
            {row.original.reception.map((vastaanotto, index) => (
              <>
                {index > 0 && index % 3 === 0 && <br />}
                <span key={vastaanotto}>{vastaanotto}</span>
              </>
            ))}
          </Stack>
        ),
      },
      {
        accessorFn: (row) => row.languages.join(", "),
        accessorKey: "languages",
        header: "Kieli",
        size: 120,
        filterVariant: "autocomplete",
      },
      {
        accessorFn: (row) =>
          `${row.extraInfo.join(", ")}, ${row.additionalInfo.join(", ")}`,
        header: "Lisätiedot",
        accessorKey: "extras",
        size: 130,
        Cell: ({ row }) => (
          <Stack spacing={2}>
            <Box>{row.original.extraInfo.join(", ")}</Box>
            <Box>{row.original.additionalInfo.join(", ")}</Box>
          </Stack>
        ),
      },
      {
        accessorKey: "Sähköposti",
        header: "Sähköposti",
        size: 155,
        accessorFn: (row) => (row.email && row.email.length ? true : false),
        Cell: ({ row }) => <EmailCell therapist={row.original} />,
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
        accessorFn: (row) => (row.phoneNumber ? true : false),
        Cell: ({ row }) => <PhoneCell therapist={row.original} />,
        filterVariant: "checkbox",
      },
      {
        accessorKey: "homePage",
        header: "Kotisivut",
        size: 120,
        accessorFn: (row) => (row.homePage ? true : false),
        Cell: ({ row }) => <HomepageCell therapist={row.original} />,
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
        jobTitle: false,
        targetGroups: false,
        languages: false,
      },
    },
    muiTableContainerProps: {
      className: "table-container",
    },
    state: { pagination },
    onPaginationChange: setPagination,
    // renderDetailPanel: ({ row }) => <CardDetailPanel row={row} />,
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

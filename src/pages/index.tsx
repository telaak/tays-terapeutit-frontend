import axios from "axios";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import Head from "next/head";
import { useMemo } from "react";
import { MRT_Localization_FI } from "@/fi-i18";
import { Terapeutti } from "@/types";
import { DetailPanel } from "../../components/detailPanel";
import { CustomActions } from "../../components/topToolbarCustomActions";

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
        size: 180,
        filterVariant: "autocomplete",
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
        accessorFn: (row) => row.Vastaanotot.join(", "),
        id: "Vastaanotot",
        header: "Vastaanotot",
        size: 150,
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
        accessorKey: "Kotisivut",
        header: "Kotisivut",
        size: 120,
        accessorFn: (row) => (row.Kotisivut ? true : false),
        Cell: ({ row }) => <>{row.original.Kotisivut}</>,
        filterVariant: "checkbox",
        muiTableBodyCellProps: {
          sx: {
            wordBreak: "break-all",
          },
        },
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
        accessorKey: "Puhelin",
        header: "Puhelin",
        size: 100,
        accessorFn: (row) => (row.Puhelin ? true : false),
        Cell: ({ row }) => <>{row.original.Puhelin}</>,
        filterVariant: "checkbox",
      },
      {
        accessorKey: "Sähköposti",
        header: "Sähköposti",
        size: 155,
        accessorFn: (row) => (row.Sähköposti ? true : false),
        Cell: ({ row }) => <>{row.original.Sähköposti}</>,
        filterVariant: "checkbox",
        muiTableBodyCellProps: {
          sx: {
            wordBreak: "break-all",
          },
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    layoutMode: "grid-no-grow",
    muiTableContainerProps: { className: "table-container" },
    enableRowSelection: true,
    enableGrouping: true,
    enableColumnFilterModes: true,
    enableStickyHeader: true,
    enableColumnDragging: false,
    positionToolbarAlertBanner: "none",
    enablePagination: false,
    enableBottomToolbar: false,
    enableFullScreenToggle: false,
    localization: MRT_Localization_FI,
    enableFacetedValues: true,
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
    renderTopToolbarCustomActions: ({ table }) => (
      <CustomActions table={table} />
    ),
    renderDetailPanel: ({ row }) => <DetailPanel row={row} />,
  });

  return (
    <>
      <Head>
        <title>TAYS Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MaterialReactTable table={table} />
    </>
  );
}

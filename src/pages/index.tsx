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

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    // layoutMode: "grid-no-grow",
    muiTableContainerProps: { className: "table-container" },
    enableRowSelection: true,
    enableGrouping: true,
    enableColumnFilterModes: true,
    enableStickyHeader: true,
    positionToolbarAlertBanner: "none",
    enablePagination: false,
    enableBottomToolbar: false,
    enableFullScreenToggle: false,
    localization: MRT_Localization_FI,
    initialState: {
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

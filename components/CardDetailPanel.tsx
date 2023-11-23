import { Terapeutti } from "@/types";
import { Grid, Stack } from "@mui/material";
import { MRT_Row } from "material-react-table";
import { DetailCard } from "./DetailCard";

export function CardDetailPanel({ row }: { row: MRT_Row<Terapeutti> }) {
  return (
    <Stack direction="row" flexWrap="wrap" useFlexGap spacing={2}>
      <DetailCard title="Paikkakunta" content={row.original.Paikkakunta} />
      <DetailCard title="Kohderyhmä" content={row.original.Kohderyhmä} />
      <DetailCard title="Kieli" content={row.original.Kieli} />
      <DetailCard title="Kotisivut" content={row.original.Kotisivut} />
      <DetailCard title="Ajanvaraus" content={row.original.Ajanvaraus} />
      <DetailCard title="Koulutus" content={row.original.Koulutus} />
      <DetailCard title="Kela" content={row.original.Kela} />
      <DetailCard title="Lisätiedot" content={row.original.Lisätiedot} />
    </Stack>
  );
}

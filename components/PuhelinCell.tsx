import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";
import { MRT_Row } from "material-react-table";

export function PuhelinCell({ row }: { row: MRT_Row<Terapeutti> }) {
  const phoneNumbers = row.original.Puhelin
    ? row.original.Puhelin.split(",")
    : [];
  const parsedNumbers = phoneNumbers.map((phoneNumber) => {
    return phoneNumber.replace(/\D/g, "");
  });
  return (
    <Stack spacing={2}>
      {parsedNumbers.map((parsedNumber) => {
        return (
          <a key={parsedNumber} href={`tel:${parsedNumber}`}>
            {parsedNumber}
          </a>
        );
      })}
    </Stack>
  );
}

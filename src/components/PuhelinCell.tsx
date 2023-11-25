import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";

export function PuhelinCell({ terapeutti }: { terapeutti: Terapeutti }) {
  const phoneNumbers = terapeutti.Puhelin ? terapeutti.Puhelin.split(",") : [];
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

import { splitPhoneNumbers } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";

export function PuhelinCell({ terapeutti }: { terapeutti: Terapeutti }) {
  const parsedNumbers = splitPhoneNumbers(terapeutti.Puhelin);
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

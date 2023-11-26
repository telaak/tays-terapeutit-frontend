import { trimPhoneNumber } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";

export function PuhelinCell({ terapeutti }: { terapeutti: Terapeutti }) {
  return (
    <Stack spacing={2}>
      {terapeutti.Puhelin.map((phoneNumber) => {
        return (
          <a key={phoneNumber} href={`tel:${trimPhoneNumber(phoneNumber)}`}>
            {phoneNumber}
          </a>
        );
      })}
    </Stack>
  );
}

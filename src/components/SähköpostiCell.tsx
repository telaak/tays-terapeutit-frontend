import { parseEmail } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";

export function SähköpostiCell({ terapeutti }: { terapeutti: Terapeutti }) {
  return (
    <Stack spacing={2}>
      {terapeutti.Sähköposti.map((email) => (
        <a key={email} href={`mailto:${parseEmail(terapeutti, email)}`}>
          {parseEmail(terapeutti, email)}
        </a>
      ))}
    </Stack>
  );
}

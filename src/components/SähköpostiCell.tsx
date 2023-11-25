import { parseEmail, splitEmails } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";

export function SähköpostiCell({ terapeutti }: { terapeutti: Terapeutti }) {
  const parsedEmails = splitEmails(terapeutti);
  return (
    <Stack spacing={2}>
      {parsedEmails.map((parsedEmail) => (
        <a key={parsedEmail} href={`mailto:${parsedEmail}`}>
          {parsedEmail}
        </a>
      ))}
    </Stack>
  );
}

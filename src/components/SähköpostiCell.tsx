import { parseEmail } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";

export function SähköpostiCell({ terapeutti }: { terapeutti: Terapeutti }) {
  const emails = terapeutti.Sähköposti.split(",");
  const parsedEmails = emails.map((email) => parseEmail(terapeutti, email));
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

import { parseEmail } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";
import { MRT_Row } from "material-react-table";

export function SähköpostiCell({ row }: { row: MRT_Row<Terapeutti> }) {
  const emails = row.original.Sähköposti.split(",");
  const parsedEmails = emails.map((email) => parseEmail(row.original, email));
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

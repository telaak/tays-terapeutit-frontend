import { parseEmail } from "@/helperFunctions";
import { Stack } from "@mui/material";
import { Therapist } from "@prisma/client";

export function EmailCell({ therapist }: { therapist: Therapist }) {
  return (
    <Stack spacing={2}>
      {therapist.email && therapist.email.split(",").map((email) => (
        <a key={email} href={`mailto:${parseEmail(therapist, email)}`}>
          {parseEmail(therapist, email)}
        </a>
      ))}
    </Stack>
  );
}

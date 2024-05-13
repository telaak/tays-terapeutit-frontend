import { trimPhoneNumber } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";
import { Therapist } from "@prisma/client";

export function PhoneCell({ therapist }: { therapist: Therapist }) {
  return (
    <Stack spacing={2}>
      {therapist.phoneNumber && therapist.phoneNumber.split(",").map((phoneNumber) => {
        return (
          <a key={phoneNumber} href={`tel:${trimPhoneNumber(phoneNumber)}`}>
            {phoneNumber}
          </a>
        );
      })}
    </Stack>
  );
}

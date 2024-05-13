import { sendEmail, copyEmails, isSelected } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Box, Tooltip, Button } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import { CopyEmailsButton } from "./CopyEmailsButton";
import { SendEmailsButton } from "./SendEmailsButton";
import { Therapist } from "@prisma/client";

export function CustomActions({
  table,
}: {
  table: MRT_TableInstance<Therapist>;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CopyEmailsButton table={table} />
      <SendEmailsButton table={table} />
    </Box>
  );
}

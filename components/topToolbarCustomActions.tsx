import { sendEmail, copyEmails, isSelected } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Box, Tooltip, Button } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import { CopyEmailsButton } from "./CopyEmailsButton";
import { SendEmailsButton } from "./SendEmailsButton";

export function CustomActions({
  table,
}: {
  table: MRT_TableInstance<Terapeutti>;
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

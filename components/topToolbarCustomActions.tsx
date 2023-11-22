import { sendEmail, copyEmails, isSelected } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Box, Tooltip, Button } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
      <Tooltip title={"Lähetä sähköposti"}>
        <span
          style={{
            marginRight: "0.5em",
          }}
        >
          <Button
            disabled={!isSelected(table)}
            color="primary"
            onClick={() => sendEmail(table)}
            variant="contained"
            startIcon={<EmailIcon />}
            sx={{
              width: "80px",
            }}
          >
            ({table.getSelectedRowModel().flatRows.length})
          </Button>
        </span>
      </Tooltip>
      <Tooltip title={"Kopioi osoitteet"}>
        <span>
          <Button
            disabled={!isSelected(table)}
            color="primary"
            onClick={() => copyEmails(table)}
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{
              width: "80px",
            }}
          >
            ({table.getSelectedRowModel().flatRows.length})
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}

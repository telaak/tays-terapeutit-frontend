import { isSelected, sendEmail } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Button, Tooltip } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import EmailIcon from "@mui/icons-material/Email";

export function SendEmailsButton({
  table,
}: {
  table: MRT_TableInstance<Terapeutti>;
}) {
  return (
    <Tooltip title={"Lähetä sähköposti"}>
      <span>
        <Button
          disabled={!isSelected(table)}
          color="warning"
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
  );
}

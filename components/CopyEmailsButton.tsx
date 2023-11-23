import { isSelected, copyEmails } from "@/helperFunctions";
import { Terapeutti } from "@/types";
import { Button, Tooltip } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export function CopyEmailsButton({ table }: { table: MRT_TableInstance<Terapeutti> }) {
  return (
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
  );
}

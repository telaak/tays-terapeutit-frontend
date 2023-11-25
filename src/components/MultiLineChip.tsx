import { Chip } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { HomePageLink } from "./HomePageLink";

export function MultiLineChip({
  icon,
  label,
}: {
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  label: ReactNode;
}) {
  return (
    <Chip
      sx={{
        height: "auto",
        padding: 0.5,
        "& .MuiChip-label": {
          display: "block",
          whiteSpace: "normal",
        },
      }}
      icon={icon}
      label={label}
    />
  );
}

import { Stack } from "@mui/material";
import { HomePageLink } from "./HomePageLink";
import { Terapeutti } from "@/types";

export function HomepageCell({ terapeutti }: { terapeutti: Terapeutti }) {
  return (
    <Stack spacing={2}>
      {terapeutti.Kotisivut.map((page) => (
        <HomePageLink key={page} url={page} />
      ))}
    </Stack>
  );
}

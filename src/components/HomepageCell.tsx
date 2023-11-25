import { splitHomepages } from "@/helperFunctions";
import { Stack } from "@mui/material";
import { HomePageLink } from "./HomePageLink";

export function HomepageCell({ url = "" }: { url: string }) {
  const homePages = splitHomepages(url);
  return (
    <Stack spacing={2}>
      {homePages.map((page) => (
        <HomePageLink url={page} />
      ))}
    </Stack>
  );
}

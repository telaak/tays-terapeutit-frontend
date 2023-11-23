import { Stack } from "@mui/material";

export function HomePageLink({ url = "" }: { url: string }) {
  const homePages = url.trim().split(",");
  return (
    <Stack spacing={2}>
      {homePages.map((page) => {
        const trimmedPage = page.trim();
        return (
          <a
            key={trimmedPage}
            target="_blank"
            href={
              trimmedPage.startsWith("http") || trimmedPage.startsWith("https")
                ? trimmedPage
                : `http://${trimmedPage}`
            }
          >
            {page}
          </a>
        );
      })}
    </Stack>
  );
}

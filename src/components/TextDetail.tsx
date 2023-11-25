import { Box, Stack, Typography, Divider } from "@mui/material";

export function TextDetail({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Box>
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Divider orientation="horizontal" flexItem />
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{content}</Typography>
      </Stack>
    </Box>
  );
}

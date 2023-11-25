import { Box, Stack, Typography, Divider } from "@mui/material";

export function TextDetail({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack
        sx={{
          gap: 1,
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Typography
          sx={{
            wordBreak: "break-word",
          }}
          variant="body2"
        >
          {content}
        </Typography>
      </Stack>
    </Box>
  );
}

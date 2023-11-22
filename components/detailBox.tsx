import { Box, Typography } from "@mui/material";

export function DetailBox({
  title,
  content,
  link = false,
}: {
  title: string;
  content: string;
  link?: boolean;
}) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {link ? (
        <a href={content.startsWith("http") ? content : `//${content}`}>
          {content}
        </a>
      ) : (
        <Typography variant="body2" gutterBottom>
          {content}
        </Typography>
      )}
    </Box>
  );
}

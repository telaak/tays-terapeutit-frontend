import { Card, CardContent, CardHeader } from "@mui/material";

export function DetailCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>{content}</CardContent>
    </Card>
  );
}

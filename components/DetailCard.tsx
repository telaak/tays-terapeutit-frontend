import { Card, CardContent, CardHeader } from "@mui/material";
import { HomePageLink } from "./HomePageLink";

export function DetailCard({
  title,
  content,
  isLink,
}: {
  title: string;
  content: string;
  isLink?: boolean;
}) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        {isLink ? <HomePageLink url={content} /> : <>{content}</>}
      </CardContent>
    </Card>
  );
}

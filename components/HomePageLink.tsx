export function HomePageLink({ url }: { url: string }) {
  return (
    <a target="_blank" href={url.startsWith("www") ? `http://${url}` : url}>
      {url}
    </a>
  );
}

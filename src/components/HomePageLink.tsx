export function HomePageLink({ url = "" }: { url: string }) {
  return (
    <a
      key={url}
      target="_blank"
      href={
        url.startsWith("http") || url.startsWith("https")
          ? url
          : `http://${url}`
      }
    >
      {url}
    </a>
  );
}

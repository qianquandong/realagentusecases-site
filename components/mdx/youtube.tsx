export function YouTube({
  id,
  title = "YouTube video",
}: {
  id: string;
  title?: string;
}) {
  return (
    <div className="my-8 aspect-video rounded-lg overflow-hidden border border-(--color-border)">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-full border-0"
      />
    </div>
  );
}

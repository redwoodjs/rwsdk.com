export function LocalizedDate({
  date,
  ...props
}: { date: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <abbr {...props} title={date}>
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </abbr>
  );
}

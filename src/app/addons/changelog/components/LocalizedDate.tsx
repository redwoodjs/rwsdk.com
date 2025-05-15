"use client";
export function LocalizedDate({
  date,
  ...props
}: { date: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <abbr {...props} title={date}>
      {new Date(date).toLocaleDateString()}
    </abbr>
  );
}

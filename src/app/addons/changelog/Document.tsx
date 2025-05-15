export const Document: React.FC<{
  children: React.ReactNode;
  nonce?: string;
}> = ({ children, nonce }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Changelog | RedwoodSDK</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

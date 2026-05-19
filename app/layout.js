import './globals.css';

export const metadata = {
  title: 'AI Just Met You — ALi, your second operating mind',
  description: 'AI Just Met You builds ALi: a managed AI employee that learns your business, watches the moving parts, and prepares the next move before work slips.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

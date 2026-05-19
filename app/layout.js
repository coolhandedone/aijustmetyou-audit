import './globals.css';

export const metadata = {
  title: 'AI Just Met You — ALi, your managed AI employee',
  description: 'AI Just Met You builds ALi: a managed AI employee that learns your business, watches the moving parts, and keeps follow-up, inbox, admin, and next steps moving.',
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

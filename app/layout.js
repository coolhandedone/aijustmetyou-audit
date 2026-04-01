import './globals.css';

export const metadata = {
  title: 'AI Just Met You — Business Systems Audit',
  description: 'Find where AI can fix problems in your business. A structured audit across 5 core systems.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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

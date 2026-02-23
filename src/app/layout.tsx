import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Longevity Rooms Frankfurt — MIS Portal',
  description: 'Management Information System für Longevity Rooms Frankfurt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <div id="bg" aria-hidden="true" />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'tangent-template',
  description: 'Next.js + Bun + Tailwind + Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

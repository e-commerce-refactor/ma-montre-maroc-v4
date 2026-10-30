import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Ma Montre Maroc • Boutique Officielle Maroc",
  description: "Découvrez la collection officielle Ma Montre Maroc au Maroc. Paiement à la livraison et expédition express partout au Maroc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '卜算',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {children}
      <footer className="text-center text-gray-500">©2024 Nanyi</footer>
    </main>
  );
}

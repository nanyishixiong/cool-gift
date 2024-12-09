import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '赛博占卜',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {children}
      <footer className="absolute bottom-0 left-0 right-0 text-center text-gray-500">@Nanyi</footer>
    </div>
  );
}

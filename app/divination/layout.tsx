import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '卜算',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

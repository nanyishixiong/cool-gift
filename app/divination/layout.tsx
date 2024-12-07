import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '赛博算命',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

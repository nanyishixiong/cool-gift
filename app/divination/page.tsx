'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StarryBackground from '../components/StarryBackground';
import { redirect } from 'next/navigation';
const GlitchText = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    className="inline-block"
    animate={{
      x: [0, -2, 2, -2, 0],
      y: [0, 2, -2, 2, 0],
    }}
    transition={{
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  >
    {children}
  </motion.span>
);

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black font-['Orbitron',sans-serif] text-white">
      <StarryBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/30" />

      <header className="z-10 mb-4 px-4 text-center md:mb-8">
        <h1 className="mb-2 text-4xl font-bold md:text-6xl">
          <GlitchText>赛博算命</GlitchText>
        </h1>
        <p className="text-base text-cyan-300 md:text-xl">
          欢迎来到赛博算命世界！在这里我们将利用最先进的技术来预测您的未来。
        </p>
      </header>

      <main className="z-10 flex flex-col items-center justify-center">
        <motion.button
          className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.9)] md:mt-8 md:px-12 md:py-6 md:text-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => redirect('/divination/main')}
        >
          开始算命
        </motion.button>
      </main>

      <div className="pointer-events-none absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

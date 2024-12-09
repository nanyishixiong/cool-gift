import { motion } from 'framer-motion';
export const GlitchText = ({ children }: { children: React.ReactNode }) => (
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

import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeInTag = 'div' | 'h1' | 'h2' | 'p' | 'nav' | 'span' | 'section' | 'li';

interface FadeInProps {
  children?: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: FadeInTag;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
  as = 'div',
}: FadeInProps) {
  // motion.create() builds a motion component for any element type.
  // Memoised so the component identity is stable between renders.
  const Component = useMemo(() => motion.create(as as 'div'), [as]);

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}

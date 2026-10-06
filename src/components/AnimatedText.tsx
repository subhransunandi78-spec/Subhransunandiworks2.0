import { useRef, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder reserves the exact layout space */}
      <span aria-hidden="true" style={{ opacity: 0 }}>
        {char}
      </span>
      {/* Animated copy sits on top of the placeholder */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0"
        style={{ opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => {
        const wordChars = word.split('').map((char) => {
          const start = charIndex / totalChars;
          const end = (charIndex + 1) / totalChars;
          charIndex += 1;
          return (
            <Char
              key={`${wi}-${charIndex}`}
              char={char}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        });
        // account for the space that follows each word
        const space = wi < words.length - 1 ? ' ' : '';
        if (space) charIndex += 1;

        return (
          <span key={wi} className="inline-block whitespace-nowrap">
            {wordChars}
            {space && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}

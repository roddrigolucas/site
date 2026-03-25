import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  initialPosition?: { x: number; y: number };
  children: React.ReactNode;
}

export default function MagneticFramer({ initialPosition, children }: Props) {
  const initialPositionDefault = initialPosition ?? { x: 0, y: 0 };

  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: initialPositionDefault.x,
    y: initialPositionDefault.y,
  });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 1.5);
    const middleY = clientY - (top + height / 1.5);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: initialPositionDefault.x, y: initialPositionDefault.y });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: 'relative' }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 80, damping: 15, mass: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

import { useEffect, useState, useRef } from 'react';

function randomColor(currentColor) {
  const COLOR_LIST = ['red', 'green', 'blue', 'yellow', 'pink', 'purple'];

  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * COLOR_LIST.length);
  }

  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState('transparent');

  const colorRef = useRef('transparent');

  // Change color every 1 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(colorRef.current);
      setColor(newColor);

      colorRef.current = newColor;
    }, 1000);
    return () => clearInterval(colorInterval);
  }, []);

  return color;
}

export default useMagicColor;

import { useState, useEffect } from 'react';

function formatDate(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function useClock() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeString = formatDate(now);

      setTimeString(newTimeString);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return { timeString };
}

export default useClock;

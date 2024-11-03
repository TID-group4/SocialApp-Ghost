import { useCallback } from 'react';

function useRandomUsername() {
  const generateRandomUsername = useCallback(() => {
    const names = ["Alex", "Sam", "Tom", "Taylor", "Jordan", "Morgan"];
    const suffix = Math.floor(Math.random() * 1000);
    return `${names[Math.floor(Math.random() * names.length)]}${suffix}`;
  }, []);

  return generateRandomUsername;
}

export default useRandomUsername;
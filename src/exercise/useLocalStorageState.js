
import { useState, useEffect } from 'react';

export const useLocalStorageState = (key, initialValue) => {
  
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  
  useEffect(() => {
    if (state !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(state));
    } else {
      window.localStorage.removeItem(key); 
    }
  }, [key, state]); 

  return [state, setState]; 
};
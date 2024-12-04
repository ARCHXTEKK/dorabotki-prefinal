import { useEffect } from "react";

export default function useDebounce(cb, delay) {
  useEffect(() => {
    let timeout = setTimeout(cb, delay);
    return () => clearTimeout(timeout);
  }, [cb, delay]);
}

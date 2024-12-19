import { useState } from "react";

export default function useInput({ onChange }) {
  const [value, setValue] = useState();

  const handleValueChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return { value, handleValueChange };
}

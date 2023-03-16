import { useState, useEffect } from "react";
export function useLocalStorage<T>(key: string, initalValue: T | (() => T)) {
  //  let value:T;
  const jsonValue = localStorage.getItem(key);
  if (jsonValue != null) return JSON.parse(jsonValue);
  if (typeof initalValue === "function") {
    return (initalValue as () => T)();
  } else {
    return null;
  }

  //     useEffect(() => {
  //       localStorage.setItem(key, JSON.stringify(value));
  //     }, [key, value]);
  //     return [value, setValue] as [typeof value, typeof setValue];
  // }
}

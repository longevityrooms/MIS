'use client';

import { useState, useCallback } from 'react';

export function useDetailModal<T = unknown>() {
  const [selected, setSelected] = useState<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((item: T) => {
    setSelected(item);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 300); // clear after animation
  }, []);

  return { selected, isOpen, open, close };
}

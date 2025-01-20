// src/components/ThemeToggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="テーマの切り替え"
    >
      {/* 太陽のアイコン */}
      <span className="absolute transform transition-transform duration-300 text-gray-700 dark:text-gray-400 dark:rotate-90 dark:scale-0">
        <Sun className="h-4 w-4" />
      </span>
      {/* 月のアイコン */}
      <span className="absolute transform transition-transform duration-300 text-gray-700 dark:text-gray-400 rotate-90 scale-0 dark:rotate-0 dark:scale-100">
        <Moon className="h-4 w-4" />
      </span>
    </button>
  );
}

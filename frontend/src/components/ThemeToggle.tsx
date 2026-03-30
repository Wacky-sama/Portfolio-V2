import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
    >
      {/* MOBILE ICON (no slide) */}
      <Sun
        className={`
          sm:hidden
          absolute
          w-5 h-5
          text-yellow-500
          transition-opacity duration-200
          ${isDark ? 'opacity-0' : 'opacity-100'}
        `}
      />

      <Moon
        className={`
          sm:hidden
          absolute
          w-5 h-5
          text-gray-200
          transition-opacity duration-200
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* DESKTOP SLIDER */}
      <div className="hidden sm:flex w-full h-full items-center">
        {/* Sliding knob */}
        <span
          className={`
            absolute
            top-0.5 left-0.5
            w-7 h-7
            rounded-full
            bg-white dark:bg-gray-900
            shadow-md
            transition-transform duration-300
            ${isDark ? 'translate-x-6' : 'translate-x-0'}
          `}
        />

        {/* Sun icon */}
        <Sun
          className={`
            absolute left-2
            w-4 h-4
            text-yellow-500
            transition-opacity duration-300
            ${isDark ? 'opacity-0' : 'opacity-100'}
          `}
        />

        {/* Moon icon */}
        <Moon
          className={`
            absolute right-2
            w-4 h-4
            text-gray-200
            transition-opacity duration-300
            ${isDark ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
    </button>
  );
}

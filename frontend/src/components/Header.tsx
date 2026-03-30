import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  fullName: string;
  location: string;
  profilePicture: string;
  tagline: string;
}

export default function Header({ fullName, location, profilePicture, tagline }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={profilePicture}
          alt={fullName}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">
            {fullName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {location}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {tagline}
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
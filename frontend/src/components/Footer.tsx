import { portfolioData } from "../config/portfolio-data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 py-8 text-center">
      <p className="text-sm dark:text-gray-100">
        © {currentYear} {portfolioData.fullName}. All rights reserved.
      </p>
      <p className="text-xs dark:text-gray-200 mt-2">
        Self-hosted on Debian Server
      </p>
    </footer>
  );
}
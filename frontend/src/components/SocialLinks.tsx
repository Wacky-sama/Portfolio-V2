import type { SocialLink } from '../config/portfolio-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Mail, Globe } from 'lucide-react';
import type { ReactElement } from 'react';

interface SocialLinksProps {
  socialLinks: SocialLink[];
  email: string;
}

export default function SocialLinks({ socialLinks, email }: SocialLinksProps) {
  const getIcon = (iconName: string): ReactElement => {
    const icons: Record<string, ReactElement> = {
      github: <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />,
      linkedin: <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />,
      twitter: <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />,
      globe: <Globe size={20} />,
    };
    return icons[iconName.toLowerCase()] || <Globe size={20} />;
  };

  return (
    <section className="mt-16 pb-16 border-b border-gray-200">
      <h2 className="text-2xl font-bold dark:text-gray-100 mb-6">Connect</h2>

      <div className="flex flex-wrap gap-4">
        {/* Social Links */}
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg bg-white text-black dark:bg-black dark:text-gray-100 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
          >
            <span className="w-5 h-5">{getIcon(link.icon)}</span>
            <span className="text-sm">{link.platform}</span>
          </a>

        ))}

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all group"
        >
          <Mail size={20} />
          <span className="text-sm">Email Me</span>
        </a>
      </div>
    </section>
  );
}
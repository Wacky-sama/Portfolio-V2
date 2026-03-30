import type { Project } from '../config/portfolio-data';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold dark:text-gray-100 mb-8">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-black hover:border-gray-50 dark:hover:bg-gray-900 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-md"
          >
            {/* Project Image */}
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProject Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            {/* Project Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold dark:text-gray-100 group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:text-gray-100 hover:text-gray-900 transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:text-gray-100 hover:text-gray-900 transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <p className="dark:text-gray-100 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white dark:bg-black text-black dark:text-white text-sm rounded border border-gray-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
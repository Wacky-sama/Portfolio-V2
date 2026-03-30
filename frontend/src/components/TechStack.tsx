import type { TechStackItem } from '../config/portfolio-data';

interface TechStackProps {
  techStack: TechStackItem[];
}

const CategorySection = ({ title, items }: { title: string; items: TechStackItem[] }) => (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-white mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((tech) => (
          <span
            key={tech.name}
            className="px-3 py-1.5 bg-white text-black dark:bg-black dark:text-white text-sm rounded-md border border-gray-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );

export default function TechStack({ techStack }: TechStackProps) {
  const categories = {
    frontend: techStack.filter(tech => tech.category === 'frontend'),
    backend: techStack.filter(tech => tech.category === 'backend'),
    database: techStack.filter(tech => tech.category === 'database'),
    devops: techStack.filter(tech => tech.category === 'devops'),
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold dark:text-gray-100 mb-8">Tech Stack</h2>
      
      <div className="dark:text-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategorySection title="Frontend" items={categories.frontend} />
        <CategorySection title="Backend" items={categories.backend} />
        <CategorySection title="Database" items={categories.database} />
        <CategorySection title="DevOps" items={categories.devops} />
      </div>
    </section>
  );
}
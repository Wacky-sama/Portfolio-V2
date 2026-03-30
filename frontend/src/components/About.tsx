interface AboutProps {
  tagline: string;
  about: string;
}

export default function About({ about }: AboutProps) {
  return (
    <section className="mt-12 space-y-6">
      <div className="border-l-2 border-gray-200 pl-6">
        <h2 className="text-lg font-bold uppercase tracking-wider mb-4">
          About
        </h2>
        <p className="dark:text-gray-300 leading-relaxed max-w-2xl">
          {about}
        </p>
      </div>
    </section>
  );
}
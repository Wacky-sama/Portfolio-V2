import { showcaseItems } from '../config/showcase-data';

export default function Showcase() {
  return (
    <section className="mt-16 pb-16 border-b border-gray-200">
      <h2 className="text-3xl font-bold mb-6">Showcase</h2>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4">
        {showcaseItems.map((item, index) => {
          // bento sizing pattern (intentional asymmetry)
          const spanClasses =
            index === 0
              ? 'md:col-span-2 md:row-span-2'
              : index === 1
              ? 'md:col-span-2'
              : index === 2
              ? 'md:row-span-2'
              : '';

          return (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl shadow-md ${spanClasses}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <span className="text-white text-sm font-medium">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
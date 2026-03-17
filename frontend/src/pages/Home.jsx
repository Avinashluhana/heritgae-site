import { Link } from 'react-router-dom';

const WHAT_YOU_CAN_DO = [
  {
    icon: '🗺️',
    title: 'Explore Heritage Locations',
    desc: 'Browse an interactive map of documented heritage sites across Karachi — from colonial buildings to ancient shrines.',
    to: '/map',
    cta: 'Explore Map',
  },
  {
    icon: '📸',
    title: 'Share & Document Places',
    desc: 'Know a heritage site that deserves to be recorded? Submit it with photos, location, and its story.',
    to: '/submit',
    cta: 'Add a Site',
  },
  {
    icon: '📖',
    title: 'Read Stories of Living Heritage',
    desc: 'Discover the people, crafts, and traditions that keep Karachi\'s heritage alive — told in their own words.',
    to: '/stories',
    cta: 'Read Stories',
  },
  {
    icon: '🚶',
    title: 'Participate in Heritage Walks',
    desc: 'Join guided walks through Karachi\'s historic neighbourhoods — Saddar, Kharadar, Lyari, Clifton, and more.',
    to: '/walks',
    cta: 'View Walks',
  },
  {
    icon: '🤝',
    title: 'Volunteer for Documentation',
    desc: 'Help photograph, research, and record heritage sites across the city. No experience required — just curiosity.',
    to: '/volunteer',
    cta: 'Volunteer',
  },
  {
    icon: '💛',
    title: 'Support Through Donations',
    desc: 'Fund field documentation, restoration projects, and community education programmes across Karachi.',
    to: '/donate',
    cta: 'Donate',
  },
];

const STATS = [
  { value: '0', label: 'Sites Documented' },
  { value: '0', label: 'Neighbourhoods Covered' },
  { value: '0', label: 'Volunteers' },
  { value: '0', label: 'Heritage Walks Conducted' },
];

const GALLERY = [
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/PK_Karachi_asv2020-02_img36_Empress_Market.jpg',
    label: 'Empress Market, Saddar',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Frere_Hall_and_surrounding_gardens_1.jpg',
    label: 'Frere Hall, Saddar',
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Abdullah_Shah_Ghazi_Shrine_Clifton_Karachi.jpg',
    label: 'Abdullah Shah Ghazi Shrine',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-36 bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.dawn.com/primary/2017/05/590b7bf3d0059.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Karachi Living Heritage
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Preserve the Soul<br />of Karachi
          </h1>
          <p className="text-stone-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            A community-driven platform to document, celebrate, and protect the cultural heritage of Karachi —
            its buildings, its people, and the living traditions that make this city irreplaceable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/map" className="btn-primary text-base px-8 py-3">Explore Heritage</Link>
            <Link to="/submit" className="btn-secondary text-base px-8 py-3 border-white text-white hover:bg-white/10">Add Heritage</Link>
            <Link to="/stories" className="bg-white/15 hover:bg-white/25 text-white font-semibold text-base px-8 py-3 rounded-lg transition border border-white/30">Share Your Story</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-heritage-500 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-3xl font-bold">{value}</p>
              <p className="text-heritage-100 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* I Am Heritage — App Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className="space-y-5">
              <span className="inline-block bg-heritage-100 dark:bg-heritage-900/40 text-heritage-700 dark:text-heritage-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
                About This Platform
              </span>
              <h2 className="font-serif text-4xl font-bold text-stone-800 dark:text-stone-100 leading-tight">
                I Am Heritage
              </h2>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                <span className="font-semibold text-stone-700 dark:text-stone-200">I Am Heritage</span> is a community-driven digital platform developed as part of Anosha Arbab Memon's master's thesis under the ARURCOHE Erasmus Mundus program. The application is grounded in the <span className="font-semibold text-stone-700 dark:text-stone-200">UNESCO Historic Urban Landscape (HUL)</span> approach and aligned with the principles of the Cape Town Document on Modern Heritage, which emphasise the recognition of living and modern heritage.
              </p>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                The platform responds to a critical gap in existing heritage systems, where official inventories often focus on monuments and historic buildings, while overlooking the everyday cultural practices, community spaces, local vendors, and lived experiences that shape the identity of a city.
              </p>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                By creating a <span className="font-semibold text-stone-700 dark:text-stone-200">participatory digital inventory</span>, the platform acts as a digital layer of the city — capturing both tangible and intangible heritage through community input, and reflecting the core idea of HUL: understanding heritage as a dynamic, evolving system shaped by people and their everyday lives.
              </p>
            </div>

            {/* Right: What you can do + pillars */}
            <div className="space-y-6">
              {/* Participatory features */}
              <div className="card p-6 space-y-3">
                <h3 className="font-semibold text-stone-800 dark:text-stone-100 text-lg">Anyone Can Contribute</h3>
                <ul className="space-y-2">
                  {[
                    'Record and map heritage locations',
                    'Upload images and share stories',
                    'Document intangible and living cultural practices',
                    'Contribute to a collective understanding of heritage',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-500 dark:text-stone-400">
                      <span className="text-heritage-500 mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Three pillars */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🤝', label: 'Community Participation & Volunteering' },
                  { icon: '🗺️', label: 'Digital Mapping & Data Collection' },
                  { icon: '💛', label: 'Donation-Based Heritage Support' },
                ].map(({ icon, label }) => (
                  <div key={label} className="card p-4 text-center">
                    <div className="text-3xl mb-2">{icon}</div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug">{label}</p>
                  </div>
                ))}
              </div>

              {/* Thesis note */}
              <div className="bg-heritage-50 dark:bg-heritage-900/20 border border-heritage-200 dark:border-heritage-800 rounded-xl p-4">
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                  <span className="font-semibold text-heritage-700 dark:text-heritage-300">Research Context — </span>
                  This platform demonstrates how digital tools can support more inclusive, bottom-up approaches to heritage recognition and protection, especially in complex urban contexts like Karachi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3">What You Can Do Here</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Whether you have five minutes or five hours, there is a meaningful way to contribute to Karachi's heritage.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_YOU_CAN_DO.map(({ icon, title, desc, to, cta }) => (
            <div key={title} className="card p-6 hover:shadow-md transition-shadow flex flex-col">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">{title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">{desc}</p>
              <Link to={to} className="mt-4 text-sm font-semibold text-heritage-600 dark:text-heritage-400 hover:underline">
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Karachi Gallery Strip */}
      <section className="bg-stone-100 dark:bg-stone-800/60 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-center mb-10 text-stone-800 dark:text-stone-100">
            Karachi's Heritage in Frame
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map(({ image, label }) => (
              <div key={label} className="relative overflow-hidden rounded-xl group aspect-square">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-stone-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-4 text-white">Know a Heritage Site in Karachi?</h2>
          <p className="text-stone-400 mb-10 max-w-lg mx-auto">
            Help us document it before it is lost. Every submission, story, and walk brings us closer to a complete record of this city's irreplaceable past.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/map" className="btn-primary text-base px-8 py-3">Explore Heritage</Link>
            <Link to="/submit" className="bg-white text-stone-900 hover:bg-stone-100 font-semibold text-base px-8 py-3 rounded-lg transition">Add Heritage</Link>
            <Link to="/stories" className="bg-transparent border border-white/40 hover:bg-white/10 text-white font-semibold text-base px-8 py-3 rounded-lg transition">Share Your Story</Link>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-stone-400 dark:text-stone-500 border-t border-stone-200 dark:border-stone-700">
        © {new Date().getFullYear()} Karachi Living Heritage Platform. Built with ❤️ for preservation.
      </footer>
    </div>
  );
}

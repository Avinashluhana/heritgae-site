import { useState } from 'react';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/outline';

const UPCOMING_WALKS = [
  {
    id: 1,
    title: 'Empress Market Heritage Walk',
    location: 'Saddar, Karachi',
    date: 'Saturday, 19 July 2025',
    time: '7:00 AM – 10:00 AM',
    meetingPoint: 'Main entrance of Empress Market, M.A. Jinnah Road, Saddar',
    guide: 'Arif Hasan',
    guideInfo: 'Urban planner, author of "Understanding Karachi", and one of the city\'s foremost heritage advocates.',
    seats: 20,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/PK_Karachi_asv2020-02_img36_Empress_Market.jpg',
    desc: 'Explore the iconic Empress Market — built in 1889 in Gothic Revival style — and uncover the layered history of Saddar\'s colonial bazaars, the stories of vendors displaced by anti-encroachment drives, and the living culture that surrounds this landmark.',
    route: 'Empress Market → Regal Chowk → Holy Trinity Cathedral → Sind Club → Frere Hall Gardens',
    highlights: ['Empress Market', 'Frere Hall', 'Holy Trinity Cathedral', 'Regal Chowk'],
  },
  {
    id: 2,
    title: 'Saddar Colonial Architecture Walk',
    location: 'Saddar, Karachi',
    date: 'Sunday, 27 July 2025',
    time: '7:30 AM – 11:00 AM',
    meetingPoint: 'Frere Hall main gate, Fatima Jinnah Road, Saddar',
    guide: 'Mariam Noor',
    guideInfo: 'Architect and heritage researcher specialising in colonial-era buildings of Karachi.',
    seats: 25,
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Frere_Hall_and_surrounding_gardens_1.jpg',
    desc: 'Walk through Karachi\'s colonial heart — past Frere Hall, the grand buildings of the British Raj era, pre-partition cinemas, and the architectural gems still standing along M.A. Jinnah Road.',
    route: 'Frere Hall → Sind Club → Hindu Gymkhana → Metropole Hotel → Merewether Tower',
    highlights: ['Frere Hall', 'Hindu Gymkhana', 'Merewether Tower', 'Sind Club'],
  },
  {
    id: 3,
    title: 'Burns Road Food Heritage Walk',
    location: 'Burns Road, Karachi',
    date: 'Saturday, 2 August 2025',
    time: '6:30 AM – 10:00 AM',
    meetingPoint: 'Burns Road junction near Bohri Bazaar, Saddar',
    guide: 'Zubair Qureshi',
    guideInfo: 'Food historian and journalist who has documented Karachi\'s culinary heritage for over a decade.',
    seats: 20,
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Frere_Hall_Karachi%2C_Pk.jpg',
    desc: 'Trace the history of Burns Road — from a refugee settlement after 1947 to Karachi\'s most iconic food street. Visit family-run bakeries, nihari shops, and sweet stalls whose recipes have been passed down for generations.',
    route: 'Burns Road start → Hyderabadi bakeries → Nihari houses → Bohri Bazaar → Old refugee settlement lanes',
    highlights: ['Hyderabadi Bakeries', 'Nihari Houses', 'Bohri Bazaar', 'Refugee Settlement History'],
  },
  {
    id: 4,
    title: 'Karachi Port & Manora Island Walk',
    location: 'Keamari, Karachi',
    date: 'Sunday, 10 August 2025',
    time: '8:00 AM – 1:00 PM',
    meetingPoint: 'Keamari Jetty, near KPT Gate, Keamari',
    guide: 'Sana Baloch',
    guideInfo: 'Marine heritage researcher and author documenting the port history of Karachi.',
    seats: 18,
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Manora_Beach%2C_Karachi_Pakistan.jpg',
    desc: 'Take a boat to Manora Island and explore its 19th-century lighthouse, Hindu temples, and the old Portuguese-era church — a forgotten gem in Karachi\'s harbour. Includes a walk along the historic Keamari waterfront.',
    route: 'Keamari Jetty → Boat to Manora → Manora Lighthouse → Shri Varun Dev Mandir → St. Paul\'s Church → Return',
    highlights: ['Manora Lighthouse', 'Shri Varun Dev Mandir', 'St. Paul\'s Church', 'Keamari Jetty'],
  },
];

const SELF_GUIDED = [
  {
    icon: '🗺️',
    title: 'Saddar Colonial Trail',
    desc: 'A 3 km self-guided route through Saddar\'s colonial buildings — Frere Hall, Empress Market, Holy Trinity Cathedral, and Merewether Tower. Download the PDF map and audio guide.',
    duration: '2–3 hours',
    distance: '3 km',
  },
  {
    icon: '🍛',
    title: 'Burns Road Food Trail',
    desc: 'Follow the food heritage of Burns Road at your own pace — from the oldest nihari houses to Hyderabadi bakeries. Includes a printed guide with the history of each stop.',
    duration: '1–2 hours',
    distance: '1.5 km',
  },
  {
    icon: '🕌',
    title: 'Kharadar Old Town Trail',
    desc: 'Explore the dense lanes of Kharadar — one of Karachi\'s oldest neighbourhoods — visiting the Shri Swaminarayan Mandir, old merchant havelis, and the birthplace of Quaid-e-Azam.',
    duration: '2–3 hours',
    distance: '2 km',
  },
];

const INITIAL_FORM = { name: '', email: '', phone: '', participants: '1', message: '' };

export default function HeritageWalks() {
  const [joinWalk, setJoinWalk] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState({});

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted((p) => ({ ...p, [joinWalk.id]: true }));
    setJoinWalk(null);
    setForm(INITIAL_FORM);
    toast.success(`You've registered for "${joinWalk.title}"! We'll send details to ${form.email}.`);
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/d/d5/PK_Karachi_asv2020-02_img36_Empress_Market.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Karachi Heritage Tourism
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Heritage Walks
          </h1>
          <p className="text-stone-200 text-lg max-w-xl mx-auto leading-relaxed">
            Karachi is one of South Asia's most layered cities. Our guided heritage walks and self-guided tours
            bring its stories to life — one neighbourhood, one building, one family at a time.
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100">Why Heritage Walks?</h2>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Heritage walks promote public awareness of Karachi's built and living heritage — connecting younger
              generations with the city's history through direct, embodied experience. Walking through a neighbourhood
              is fundamentally different from reading about it.
            </p>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
              Each walk is led by expert local guides — historians, architects, and long-time residents — who bring
              the stories of streets, buildings, and communities to life.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🏛️', label: 'Promote heritage awareness' },
              { icon: '👨‍👩‍👧', label: 'Connect generations with history' },
              { icon: '🚶', label: 'Guided & self-guided routes' },
              { icon: '📍', label: 'Neighbourhood-level discovery' },
            ].map(({ icon, label }) => (
              <div key={label} className="card p-4 text-center">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Walks */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-8 bg-heritage-500 rounded-full" />
          <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100">Upcoming Guided Walks</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {UPCOMING_WALKS.map((walk) => (
            <div key={walk.id} className="card overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
              <div className="overflow-hidden h-56 relative">
                <img
                  src={walk.image}
                  alt={walk.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-heritage-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {walk.seats} seats left
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 space-y-3">
                <h3 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100 leading-snug">
                  {walk.title}
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-stone-500 dark:text-stone-400">
                  <span>📍 {walk.location}</span>
                  <span>📅 {walk.date}</span>
                  <span>🕖 {walk.time}</span>
                  <span>👤 {walk.guide}</span>
                </div>

                <div className="bg-stone-50 dark:bg-stone-800 rounded-lg px-3 py-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Meeting point: </span>{walk.meetingPoint}
                </div>

                <div className="bg-stone-50 dark:bg-stone-800 rounded-lg px-3 py-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Route: </span>{walk.route}
                </div>

                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">
                  {walk.desc}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {walk.highlights.map((h) => (
                    <span key={h} className="text-xs bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-0.5 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => { setJoinWalk(walk); setForm(INITIAL_FORM); }}
                  disabled={submitted[walk.id]}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition mt-auto ${
                    submitted[walk.id]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default'
                      : 'btn-primary'
                  }`}
                >
                  {submitted[walk.id] ? '✓ Registered' : 'Join Walk →'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Self-Guided Tours */}
      <section className="bg-stone-100 dark:bg-stone-800/60 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1 h-8 bg-heritage-500 rounded-full" />
            <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100">Self-Guided Tours</h2>
          </div>
          <p className="text-stone-500 dark:text-stone-400 mb-8 ml-5">
            Explore Karachi's heritage at your own pace. Download a route map and follow the trail independently.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {SELF_GUIDED.map(({ icon, title, desc, duration, distance }) => (
              <div key={title} className="card p-6 flex flex-col space-y-3">
                <div className="text-4xl">{icon}</div>
                <h3 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-100">{title}</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">{desc}</p>
                <div className="flex gap-4 text-xs text-stone-400 pt-1">
                  <span>⏱ {duration}</span>
                  <span>📏 {distance}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => toast.info('Map download coming soon!')}
                    className="flex-1 btn-primary text-xs py-2"
                  >
                    ⬇ Download Map
                  </button>
                  <a href="/map" className="flex-1 btn-secondary text-xs py-2 text-center">
                    View on Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide CTA */}
      <section className="bg-heritage-500 text-white py-16 text-center px-4">
        <h2 className="font-serif text-3xl font-bold mb-3">Know Karachi's Hidden Stories?</h2>
        <p className="text-heritage-100 mb-7 max-w-md mx-auto">
          If you're a local historian, architect, or passionate Karachiite — lead a walk and share what you know.
        </p>
        <button
          onClick={() => toast.info('Walk proposal form coming soon!')}
          className="bg-white text-heritage-600 font-semibold px-10 py-3 rounded-xl hover:bg-heritage-50 transition"
        >
          Propose a Walk →
        </button>
      </section>

      <footer className="text-center py-8 text-sm text-stone-400 dark:text-stone-500 border-t border-stone-200 dark:border-stone-700">
        © {new Date().getFullYear()} I Am Heritage Platform. Built with ❤️ for preservation.
      </footer>

      {/* Join Walk Modal */}
      {joinWalk && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setJoinWalk(null)}
        >
          <div
            className="bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header image */}
            <div className="h-40 overflow-hidden rounded-t-2xl relative">
              <img src={joinWalk.image} alt={joinWalk.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-4 left-5 right-10">
                <h2 className="font-serif text-xl font-bold text-white leading-snug">{joinWalk.title}</h2>
                <p className="text-stone-300 text-xs mt-1">📅 {joinWalk.date} &nbsp;|&nbsp; 🕖 {joinWalk.time}</p>
              </div>
              <button
                onClick={() => setJoinWalk(null)}
                className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/70 transition"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Walk details summary */}
              <div className="bg-stone-50 dark:bg-stone-800 rounded-xl p-4 space-y-1.5 text-sm text-stone-600 dark:text-stone-300">
                <p><span className="font-semibold">📍 Meeting point:</span> {joinWalk.meetingPoint}</p>
                <p><span className="font-semibold">🗺 Route:</span> {joinWalk.route}</p>
                <p><span className="font-semibold">👤 Guide:</span> {joinWalk.guide} — {joinWalk.guideInfo}</p>
                <p><span className="font-semibold">🪑 Seats left:</span> {joinWalk.seats}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-semibold text-stone-800 dark:text-stone-100">Register Your Spot</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input
                      className="input-field"
                      placeholder="Your full name"
                      required
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      className="input-field"
                      placeholder="+92 300 0000000"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Participants *</label>
                    <select
                      className="input-field"
                      required
                      value={form.participants}
                      onChange={(e) => set('participants', e.target.value)}
                    >
                      {[1,2,3,4,5].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Any questions or special requirements?</label>
                  <textarea
                    className="input-field resize-none"
                    rows={3}
                    placeholder="e.g. wheelchair access, dietary needs, questions for the guide…"
                    value={form.message}
                    onChange={(e) => set('message', e.target.value)}
                  />
                </div>

                <p className="text-xs text-stone-400">
                  Walk details and confirmation will be sent to your email address.
                </p>

                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn-primary py-3">
                    Confirm Registration →
                  </button>
                  <button
                    type="button"
                    onClick={() => setJoinWalk(null)}
                    className="flex-1 btn-secondary py-3"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

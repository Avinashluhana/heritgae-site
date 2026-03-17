import { useState } from 'react';
import { toast } from 'react-toastify';

const OPPORTUNITIES = [
  {
    icon: '📸',
    title: 'Heritage Documentation',
    desc: 'Visit and photograph heritage sites across Karachi — buildings, shrines, markets, and neighbourhoods — and submit detailed records to our inventory.',
  },
  {
    icon: '🎞️',
    title: 'Photography',
    desc: 'Use your photography skills to visually document heritage sites, community spaces, and living cultural practices before they change or disappear.',
  },
  {
    icon: '🎙️',
    title: 'Oral History Interviews',
    desc: 'Record conversations with elders, vendors, craftspeople, and long-time residents to capture the living memory of Karachi\'s neighbourhoods.',
  },
  {
    icon: '🗺️',
    title: 'Mapping Heritage Locations',
    desc: 'Help build our digital map by geotagging heritage sites, marking boundaries, and verifying location data across the city.',
  },
  {
    icon: '🚶',
    title: 'Organising Heritage Walks',
    desc: 'Plan, coordinate, and lead guided heritage walks through Karachi\'s historic areas — Saddar, Kharadar, Lyari, Clifton, and beyond.',
  },
  {
    icon: '💻',
    title: 'Digital & Research Support',
    desc: 'Contribute remotely through data entry, translation, archival research, social media, or writing stories for the platform.',
  },
];

const INTERESTS = [
  'Photography',
  'Research',
  'Community Engagement',
  'Event Organisation',
  'Oral History',
  'Mapping & GIS',
  'Writing & Documentation',
  'Social Media',
];

const CITY_AREAS = [
  'Saddar',
  'Kharadar / Old Town',
  'Lyari',
  'Clifton',
  'Defence (DHA)',
  'Gulshan-e-Iqbal',
  'North Nazimabad',
  'Korangi',
  'Malir',
  'Keamari',
  'Other',
];

const STATS = [
  { value: '850+', label: 'Active Volunteers' },
  { value: '18', label: 'Neighbourhoods Covered' },
  { value: '320+', label: 'Sites Documented' },
  { value: '40+', label: 'Walks Organised' },
];

const INITIAL = { name: '', email: '', area: '', skills: '', interests: [] };

export default function Volunteer() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const toggleInterest = (interest) => {
    setForm((p) => ({
      ...p,
      interests: p.interests.includes(interest)
        ? p.interests.filter((i) => i !== interest)
        : [...p.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.interests.length === 0) return toast.error('Please select at least one area of interest.');
    setSubmitted(true);
    toast.success("Thank you! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/e9/Frere_Hall_and_surrounding_gardens_1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Community Participation
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Volunteer
          </h1>
          <p className="text-stone-200 text-lg max-w-xl mx-auto leading-relaxed">
            Karachi's heritage belongs to its people. Help us document, preserve, and share it —
            one photograph, one story, one walk at a time.
          </p>
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

      {/* Volunteer Opportunities */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3">Volunteer Opportunities</h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
            People can help in many ways — whether you are on the ground in Karachi or contributing remotely from anywhere in the world.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPPORTUNITIES.map(({ icon, title, desc }) => (
            <div key={title} className="card p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">{title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="bg-stone-100 dark:bg-stone-800 py-16 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">Volunteer Form</h2>
            <p className="text-stone-500 dark:text-stone-400">
              Fill in the form below and we will match you with opportunities in your area.
            </p>
          </div>

          {submitted ? (
            <div className="card p-10 text-center">
              <div className="text-5xl mb-4">🙌</div>
              <h3 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2">You're In!</h3>
              <p className="text-stone-500 dark:text-stone-400 mb-1">Thank you, <span className="font-semibold">{form.name}</span>.</p>
              <p className="text-stone-500 dark:text-stone-400">We'll reach out to <span className="font-semibold">{form.email}</span> with next steps.</p>
              <button onClick={() => { setForm(INITIAL); setSubmitted(false); }} className="btn-primary mt-6">
                Sign Up Another Person
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">

              {/* Name */}
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

              {/* Email */}
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

              {/* City Area */}
              <div>
                <label className="block text-sm font-medium mb-1">City Area *</label>
                <select
                  className="input-field"
                  required
                  value={form.area}
                  onChange={(e) => set('area', e.target.value)}
                >
                  <option value="">Select your area in Karachi…</option>
                  {CITY_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-1">Your Skills</label>
                <input
                  className="input-field"
                  placeholder="e.g. Photography, Urdu writing, GIS, video editing…"
                  value={form.skills}
                  onChange={(e) => set('skills', e.target.value)}
                />
              </div>

              {/* Interests — checkbox grid */}
              <div>
                <label className="block text-sm font-medium mb-3">Areas of Interest *</label>
                <div className="grid grid-cols-2 gap-2">
                  {INTERESTS.map((interest) => (
                    <label
                      key={interest}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer text-sm transition-all ${
                        form.interests.includes(interest)
                          ? 'border-heritage-500 bg-heritage-50 dark:bg-heritage-900/20 text-heritage-700 dark:text-heritage-300 font-medium'
                          : 'border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:border-heritage-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={form.interests.includes(interest)}
                        onChange={() => toggleInterest(interest)}
                      />
                      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
                        form.interests.includes(interest)
                          ? 'bg-heritage-500 border-heritage-500'
                          : 'border-stone-300 dark:border-stone-500'
                      }`}>
                        {form.interests.includes(interest) && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Join as a Volunteer →
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-stone-400 dark:text-stone-500 border-t border-stone-200 dark:border-stone-700">
        © {new Date().getFullYear()} Karachi Living Heritage Platform. Built with ❤️ for preservation.
      </footer>
    </div>
  );
}

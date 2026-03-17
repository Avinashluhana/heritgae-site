import { useState } from 'react';
import { toast } from 'react-toastify';

const TIERS = [
  { amount: 10, label: 'Supporter', icon: '🌱', perks: 'Help document one heritage site' },
  { amount: 25, label: 'Preserver', icon: '🏛️', perks: 'Fund a guided heritage walk for a student' },
  { amount: 50, label: 'Guardian', icon: '🛡️', perks: 'Sponsor restoration materials for a site' },
  { amount: 100, label: 'Champion', icon: '🌟', perks: 'Support a full month of field documentation' },
];

const IMPACT = [
  { value: '$120K+', label: 'Raised to Date' },
  { value: '1,200+', label: 'Sites Preserved' },
  { value: '48', label: 'Countries Reached' },
  { value: '200+', label: 'Projects Funded' },
];

export default function Donate() {
  const [selected, setSelected] = useState(25);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = custom ? Number(custom) : selected;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return toast.error('Please enter a valid amount');
    setSubmitted(true);
    toast.success('Thank you for your donation!');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">💛</div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">Thank You, {name || 'Friend'}!</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-2">
            Your donation of <span className="font-semibold text-heritage-600">${finalAmount}</span> will help preserve heritage for future generations.
          </p>
          <p className="text-sm text-stone-400 mb-6">A confirmation will be sent to {email}.</p>
          <button onClick={() => { setSubmitted(false); setCustom(''); setName(''); setEmail(''); }} className="btn-primary">
            Donate Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 bg-cover bg-center"
        style={{ backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/74/Mohatta_Palace_Karachi_2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-heritage-500/90 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Make a Difference
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Donate to Preserve Heritage
          </h1>
          <p className="text-stone-200 text-lg max-w-xl mx-auto">
            Every contribution helps document, restore, and protect cultural and natural heritage around the world.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-heritage-500 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {IMPACT.map(({ value, label }) => (
            <div key={label}>
              <p className="font-serif text-3xl font-bold">{value}</p>
              <p className="text-heritage-100 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl font-bold text-center mb-2 text-stone-800 dark:text-stone-100">Choose Your Impact</h2>
        <p className="text-center text-stone-500 dark:text-stone-400 mb-10">Every dollar goes directly to heritage preservation projects.</p>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          {/* Tiers */}
          <div className="grid grid-cols-2 gap-3">
            {TIERS.map(({ amount, label, icon, perks }) => (
              <button
                key={amount}
                type="button"
                onClick={() => { setSelected(amount); setCustom(''); }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selected === amount && !custom
                    ? 'border-heritage-500 bg-heritage-50 dark:bg-heritage-900/20'
                    : 'border-stone-200 dark:border-stone-700 hover:border-heritage-300'
                }`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-bold text-stone-800 dark:text-stone-100">${amount} <span className="text-xs font-normal text-stone-500">/ {label}</span></div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{perks}</div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Or enter a custom amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium">$</span>
              <input
                type="number"
                min="1"
                step="1"
                className="input-field pl-7"
                placeholder="Other amount"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              />
            </div>
          </div>

          {/* Donor Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input className="input-field" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input type="email" className="input-field" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <p className="text-xs text-stone-400 text-center">
            💳 Payment processing via Stripe/PayPal coming soon. This records your pledge for now.
          </p>

          <button type="submit" className="btn-primary w-full py-3 text-base">
            Donate ${finalAmount || '—'} →
          </button>
        </form>
      </section>

      {/* Why Donate */}
      <section className="bg-stone-100 dark:bg-stone-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-10 text-stone-800 dark:text-stone-100">Where Your Money Goes</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { pct: '60%', label: 'Field Documentation', icon: '📸' },
              { pct: '25%', label: 'Restoration Projects', icon: '🏗️' },
              { pct: '15%', label: 'Community Education', icon: '📚' },
            ].map(({ pct, label, icon }) => (
              <div key={label} className="card p-6 text-center">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="font-serif text-3xl font-bold text-heritage-600 dark:text-heritage-400">{pct}</div>
                <div className="text-sm text-stone-500 dark:text-stone-400 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-stone-400 dark:text-stone-500 border-t border-stone-200 dark:border-stone-700">
        © {new Date().getFullYear()} HeritageSite Platform. Built with ❤️ for preservation.
      </footer>
    </div>
  );
}

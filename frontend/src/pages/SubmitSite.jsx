import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';
import LocationPicker from '../components/LocationPicker';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

const TYPES = [
  { value: 'tangible', label: 'Tangible Heritage' },
  { value: 'intangible', label: 'Intangible Heritage' },
  { value: 'living', label: 'Living Heritage' },
];

const INITIAL = {
  title: '', description: '', type: 'tangible', importance: '',
  location: null,
  donation: { amount: '', currency: 'USD' },
  volunteer: { name: '', email: '', contact: '' },
};

export default function SubmitSite() {
  const [form, setForm] = useState(INITIAL);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const set = (path, value) =>
    setForm((prev) => {
      const keys = path.split('.');
      if (keys.length === 1) return { ...prev, [path]: value };
      return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: value } };
    });

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const removeImage = (i) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.location) return toast.error('Please select a location on the map');

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('importance', form.importance);
    fd.append('type', form.type);
    fd.append('location', JSON.stringify(form.location));
    fd.append('donation', JSON.stringify({ amount: Number(form.donation.amount) || 0, currency: form.donation.currency }));
    fd.append('volunteer', JSON.stringify(form.volunteer));
    images.forEach((img) => fd.append('images', img));

    setLoading(true);
    try {
      await api.post('/submissions', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-serif text-2xl font-bold text-stone-800 dark:text-stone-100 mb-3">Thank You!</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Your heritage site submission has been received and is pending review.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setForm(INITIAL); setImages([]); setPreviews([]); setSuccess(false); }} className="btn-primary">
              Submit Another
            </button>
            <button onClick={() => navigate('/map')} className="btn-secondary">View Map</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100">Submit a Heritage Site</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2">Help preserve history by documenting a site near you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 dark:text-stone-200">Site Information</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input className="input-field" placeholder="e.g. Ancient Roman Amphitheatre" required
              value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea className="input-field min-h-[120px] resize-y" required
              placeholder="Describe the site's history, significance, and current condition..."
              value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select className="input-field" value={form.type} onChange={(e) => set('type', e.target.value)}>
              {TYPES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Why is this important? *</label>
            <textarea className="input-field min-h-[100px] resize-y" required
              placeholder="Explain the cultural, historical, or social significance of this heritage..."
              value={form.importance} onChange={(e) => set('importance', e.target.value)} />
          </div>
        </div>

        {/* Images */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 dark:text-stone-200">Images (up to 5)</h2>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-xl p-8 cursor-pointer hover:border-heritage-400 transition">
            <CloudArrowUpIcon className="w-10 h-10 text-stone-400 mb-2" />
            <span className="text-sm text-stone-500">Click to upload images</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
          </label>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden aspect-square">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition">
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 dark:text-stone-200">Location *</h2>
          <LocationPicker value={form.location} onChange={(loc) => set('location', loc)} />
        </div>

        {/* Donation */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 dark:text-stone-200">Donation (Optional)</h2>
          <div className="flex gap-3">
            <select className="input-field w-28" value={form.donation.currency}
              onChange={(e) => set('donation.currency', e.target.value)}>
              {['USD', 'EUR', 'GBP', 'INR'].map((c) => <option key={c}>{c}</option>)}
            </select>
            <input type="number" min="0" step="0.01" className="input-field" placeholder="0.00"
              value={form.donation.amount} onChange={(e) => set('donation.amount', e.target.value)} />
          </div>
          <p className="text-xs text-stone-400">
            💳 Payment processing (Stripe/PayPal) can be connected here. Amount is recorded for now.
          </p>
        </div>

        {/* Volunteer */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 dark:text-stone-200">Volunteer Information *</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input className="input-field" placeholder="Your name" required
              value={form.volunteer.name} onChange={(e) => set('volunteer.name', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input type="email" className="input-field" placeholder="you@example.com" required
              value={form.volunteer.email} onChange={(e) => set('volunteer.email', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number *</label>
            <input type="tel" className="input-field" placeholder="+1 555 000 0000" required
              value={form.volunteer.contact} onChange={(e) => set('volunteer.contact', e.target.value)} />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
          {loading ? 'Submitting…' : 'Submit Heritage Site'}
        </button>
      </form>
    </div>
  );
}

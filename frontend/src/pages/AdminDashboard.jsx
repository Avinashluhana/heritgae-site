import { useEffect, useState, useCallback } from 'react';
import api from '../api';
import Modal from '../components/Modal';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { toast } from 'react-toastify';
import {
  FunnelIcon, MagnifyingGlassIcon, ArrowPathIcon,
  CheckCircleIcon, XCircleIcon, ClockIcon,
} from '@heroicons/react/24/outline';

const STATUS_BADGE = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

const STATUS_ICON = {
  pending: <ClockIcon className="w-4 h-4" />,
  approved: <CheckCircleIcon className="w-4 h-4" />,
  rejected: <XCircleIcon className="w-4 h-4" />,
};

export default function AdminDashboard() {
  const [data, setData] = useState({ submissions: [], total: 0, pages: 1 });
  const [filters, setFilters] = useState({ type: '', status: '', from: '', to: '', page: 1 });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters, limit: 10 };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const { data: res } = await api.get('/submissions', { params });
      setData(res);
    } catch {
      toast.error('Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateStatus = async (id, status) => {
    try {
      const { data: updated } = await api.patch(`/submissions/${id}/status`, { status });
      setData((prev) => ({
        ...prev,
        submissions: prev.submissions.map((s) => s._id === id ? updated : s),
      }));
      if (selected?._id === id) setSelected(updated);
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val, page: 1 }));

  const stats = [
    { label: 'Total', value: data.total, color: 'text-heritage-600' },
    { label: 'Pending', value: data.submissions.filter((s) => s.status === 'pending').length, color: 'text-yellow-600' },
    { label: 'Approved', value: data.submissions.filter((s) => s.status === 'approved').length, color: 'text-green-600' },
    { label: 'Rejected', value: data.submissions.filter((s) => s.status === 'rejected').length, color: 'text-red-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="font-serif text-3xl font-bold text-stone-800 dark:text-stone-100">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="card p-5 text-center">
            <p className={`font-serif text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-sm text-stone-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-wrap gap-3 items-end">
        <FunnelIcon className="w-5 h-5 text-stone-400 self-center" />
        <div>
          <label className="block text-xs text-stone-500 mb-1">Type</label>
          <select className="input-field py-1.5 text-sm" value={filters.type} onChange={(e) => setFilter('type', e.target.value)}>
            <option value="">All Types</option>
            <option value="tangible">Tangible Heritage</option>
            <option value="intangible">Intangible Heritage</option>
            <option value="living">Living Heritage</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-stone-500 mb-1">Status</label>
          <select className="input-field py-1.5 text-sm" value={filters.status} onChange={(e) => setFilter('status', e.target.value)}>
            <option value="">All Statuses</option>
            {['pending', 'approved', 'rejected'].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-stone-500 mb-1">From</label>
          <input type="date" className="input-field py-1.5 text-sm" value={filters.from}
            onChange={(e) => setFilter('from', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-stone-500 mb-1">To</label>
          <input type="date" className="input-field py-1.5 text-sm" value={filters.to}
            onChange={(e) => setFilter('to', e.target.value)} />
        </div>
        <button onClick={() => setFilters({ type: '', status: '', from: '', to: '', page: 1 })}
          className="btn-secondary text-sm py-1.5 flex items-center gap-1">
          <ArrowPathIcon className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 dark:bg-stone-700/50 text-stone-500 dark:text-stone-400 text-xs uppercase tracking-wide">
              <tr>
                {['Title', 'Type', 'Volunteer', 'Donation', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-10 text-stone-400">Loading…</td></tr>
              ) : data.submissions.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-10 text-stone-400">No submissions found</td></tr>
              ) : data.submissions.map((s) => (
                <tr key={s._id} className="hover:bg-stone-50 dark:hover:bg-stone-700/30 transition">
                  <td className="px-4 py-3 font-medium text-stone-800 dark:text-stone-100 max-w-[180px] truncate">{s.title}</td>
                  <td className="px-4 py-3 text-stone-500">{s.type === 'tangible' ? 'Tangible Heritage' : s.type === 'intangible' ? 'Intangible Heritage' : 'Living Heritage'}</td>
                  <td className="px-4 py-3 text-stone-500">{s.volunteer?.name}</td>
                  <td className="px-4 py-3 text-stone-500">{s.donation?.amount > 0 ? `${s.donation.currency} ${s.donation.amount}` : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[s.status]}`}>
                      {STATUS_ICON[s.status]} {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-400 whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setSelected(s); setImgIdx(0); }}
                      className="text-heritage-600 hover:underline text-xs font-medium flex items-center gap-1">
                      <MagnifyingGlassIcon className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-stone-100 dark:border-stone-700">
            <p className="text-xs text-stone-400">Page {filters.page} of {data.pages}</p>
            <div className="flex gap-2">
              <button disabled={filters.page <= 1} onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                className="btn-secondary text-xs py-1 px-3 disabled:opacity-40">Prev</button>
              <button disabled={filters.page >= data.pages} onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                className="btn-secondary text-xs py-1 px-3 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''}>
        {selected && (
          <div className="space-y-5">
            {selected.images?.length > 0 && (
              <div>
                <img src={selected.images[imgIdx]?.url} alt="" className="w-full h-56 object-cover rounded-xl" />
                {selected.images.length > 1 && (
                  <div className="flex gap-2 mt-2">
                    {selected.images.map((img, i) => (
                      <button key={i} onClick={() => setImgIdx(i)}
                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${i === imgIdx ? 'border-heritage-500' : 'border-transparent'}`}>
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-stone-400 text-xs">Type</p><p className="font-medium">{selected.type === 'tangible' ? 'Tangible Heritage' : selected.type === 'intangible' ? 'Intangible Heritage' : 'Living Heritage'}</p></div>
              <div>
                <p className="text-stone-400 text-xs">Status</p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[selected.status]}`}>
                  {STATUS_ICON[selected.status]} {selected.status}
                </span>
              </div>
              <div><p className="text-stone-400 text-xs">Submitted</p><p>{new Date(selected.createdAt).toLocaleString()}</p></div>
              <div><p className="text-stone-400 text-xs">Donation</p>
                <p>{selected.donation?.amount > 0 ? `${selected.donation.currency} ${selected.donation.amount}` : 'None'}</p>
              </div>
            </div>

            <div>
              <p className="text-stone-400 text-xs mb-1">Description</p>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{selected.description}</p>
            </div>

            <div className="bg-stone-50 dark:bg-stone-700/40 rounded-xl p-4 text-sm space-y-1">
              <p className="font-semibold text-stone-700 dark:text-stone-200 mb-2">Volunteer</p>
              <p>👤 {selected.volunteer?.name}</p>
              <p>✉️ {selected.volunteer?.email}</p>
              <p>📞 {selected.volunteer?.contact}</p>
            </div>

            {selected.location?.lat && (
              <div className="rounded-xl overflow-hidden h-40 border border-stone-200 dark:border-stone-600">
                <MapContainer center={[selected.location.lat, selected.location.lng]} zoom={13}
                  style={{ height: '100%', width: '100%' }} zoomControl={false} dragging={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
              </div>
            )}
            {selected.location?.address && (
              <p className="text-xs text-stone-400">📍 {selected.location.address}</p>
            )}

            <div className="flex gap-3 pt-2 border-t border-stone-100 dark:border-stone-700">
              <button onClick={() => updateStatus(selected._id, 'approved')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded-lg transition">
                ✓ Approve
              </button>
              <button onClick={() => updateStatus(selected._id, 'rejected')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition">
                ✗ Reject
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

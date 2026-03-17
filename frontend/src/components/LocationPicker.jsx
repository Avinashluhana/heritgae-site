import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function ClickHandler({ onSelect }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      let address = '';
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        address = data.display_name || '';
      } catch {}
      onSelect({ lat, lng, address });
    },
  });
  return null;
}

function FlyTo({ target }) {
  const map = useMap();
  if (target) map.flyTo([target.lat, target.lng], 15, { duration: 1.2 });
  return null;
}

export default function LocationPicker({ value, onChange }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [flyTarget, setFlyTarget] = useState(null);
  const debounceRef = useRef(null);

  const center = value?.lat ? [value.lat, value.lng] : [24.8607, 67.0011]; // default: Karachi

  const handleSearch = (q) => {
    setQuery(q);
    clearTimeout(debounceRef.current);
    if (!q.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&countrycodes=pk`
        );
        const data = await res.json();
        setResults(data);
      } catch {}
      setSearching(false);
    }, 400);
  };

  const handleSelect = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const address = result.display_name;
    setFlyTarget({ lat, lng });
    onChange({ lat, lng, address });
    setQuery(address);
    setResults([]);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
          <input
            type="text"
            className="input-field pl-9 pr-9"
            placeholder="Search for a location in Karachi…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-stone-400 hover:text-stone-600 transition"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown results */}
        {(results.length > 0 || searching) && (
          <div className="absolute z-[1000] top-full left-0 right-0 mt-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 rounded-xl shadow-lg overflow-hidden">
            {searching && (
              <p className="text-xs text-stone-400 px-4 py-3">Searching…</p>
            )}
            {results.map((r) => (
              <button
                key={r.place_id}
                type="button"
                onClick={() => handleSelect(r)}
                className="w-full text-left px-4 py-2.5 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 border-b border-stone-100 dark:border-stone-700 last:border-0 transition"
              >
                <span className="font-medium">{r.name || r.display_name.split(',')[0]}</span>
                <span className="block text-xs text-stone-400 truncate mt-0.5">{r.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-stone-400">Or click directly on the map to pin a location</p>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-stone-300 dark:border-stone-600 h-64">
        <MapContainer center={center} zoom={value?.lat ? 13 : 12} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onSelect={(loc) => { onChange(loc); setQuery(loc.address); setFlyTarget(loc); }} />
          <FlyTo target={flyTarget} />
          {value?.lat && <Marker position={[value.lat, value.lng]} />}
        </MapContainer>
      </div>

      {value?.address && (
        <p className="text-xs text-stone-500 dark:text-stone-400">📍 {value.address}</p>
      )}
      {value?.lat && (
        <p className="text-xs text-stone-400">{value.lat.toFixed(5)}, {value.lng.toFixed(5)}</p>
      )}
    </div>
  );
}

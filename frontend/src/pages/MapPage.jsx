import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import api from '../api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapPage() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/submissions?status=approved&limit=200')
      .then(({ data }) => setSites(data.submissions))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="px-4 py-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
        <div>
          <h1 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-100">Heritage Sites Map</h1>
          <p className="text-sm text-stone-500">{sites.length} approved sites</p>
        </div>
      </div>
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-stone-400">Loading map…</div>
      ) : (
        <MapContainer center={[20, 0]} zoom={2} style={{ flex: 1 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a>' />
          {sites.map((site) =>
            site.location?.lat && (
              <Marker key={site._id} position={[site.location.lat, site.location.lng]}>
                <Popup>
                  <div className="min-w-[160px]">
                    {site.images?.[0] && (
                      <img src={site.images[0].url} alt={site.title} className="w-full h-24 object-cover rounded mb-2" />
                    )}
                    <p className="font-semibold text-sm">{site.title}</p>
                    <p className="text-xs text-stone-500 capitalize mt-0.5">{site.type}</p>
                    {site.location.address && (
                      <p className="text-xs text-stone-400 mt-1 truncate">{site.location.address}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            )
          )}
        </MapContainer>
      )}
    </div>
  );
}

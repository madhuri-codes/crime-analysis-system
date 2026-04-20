import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locationAPI } from "../services/api";
import Layout from "../components/Layout";
import "../App.css";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerRetinaUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.divIcon({
  html: '<div style="background:#ef4444;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 0 14px rgba(239,68,68,0.8);"></div>',
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

export default function CrimeMap() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await locationAPI.getLocations();
        setLocations(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const [searchParams] = useSearchParams();
  const selectedLocationId = searchParams.get('locationId');

  const safeLocations = useMemo(() => {
    return locations
      .map((loc) => ({
        ...loc,
        latitude: Number(loc.latitude),
        longitude: Number(loc.longitude),
      }))
      .filter((loc) => !Number.isNaN(loc.latitude) && !Number.isNaN(loc.longitude));
  }, [locations]);

  const selectedLocation = useMemo(() => {
    if (!selectedLocationId || safeLocations.length === 0) return null;
    return safeLocations.find((loc) => String(loc.location_id) === String(selectedLocationId)) || null;
  }, [safeLocations, selectedLocationId]);

  const center = useMemo(() => {
    if (selectedLocation) {
      return [selectedLocation.latitude, selectedLocation.longitude];
    }
    if (safeLocations.length > 0) {
      return [safeLocations[0].latitude, safeLocations[0].longitude];
    }
    return [20.5937, 78.9629];
  }, [safeLocations, selectedLocation]);

  const zoomLevel = selectedLocation ? 13 : 6;

  function RecenterMap({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position?.length === 2) {
        map.flyTo(position, zoomLevel, { animate: true });
      }
    }, [position, map, zoomLevel]);
    return null;
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Layout user={user}>
      <div style={{ width: '100%', maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ color: '#e2e8f0', margin: 0 }}>Crime Map</h1>
            <p style={{ color: '#94a3b8', margin: '8px 0 0', maxWidth: 720, lineHeight: 1.75 }}>
              Visualize crime locations loaded from the database.
            </p>
          </div>
        </div>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading map locations...</div>
        ) : error ? (
          <div style={{ color: '#f87171' }}>{error}</div>
        ) : (
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #334155', minHeight: 560, background: '#0f172a' }}>
            <MapContainer center={center} zoom={zoomLevel} style={{ minHeight: 560, width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterMap position={center} />
              {safeLocations.map((location) => (
                <Marker
                  key={location.location_id}
                  position={[location.latitude, location.longitude]}
                  icon={selectedLocation && String(location.location_id) === String(selectedLocation.location_id) ? selectedIcon : defaultIcon}
                >
                  <Popup>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                      <strong>Location ID:</strong> {location.location_id}
                      <br />
                      <strong>Address:</strong> {location.address1 || 'N/A'}
                      {location.address2 ? <><br />{location.address2}</> : null}
                      {location.address3 ? <><br />{location.address3}</> : null}
                      <br />
                      {location.district}, {location.city}, {location.state}
                      <br />
                      {location.country} — {location.pincode}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>
    </Layout>
  );
}

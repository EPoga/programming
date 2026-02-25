import type { MarkerPoint } from '../types';

interface MapWithMarkerProps {
  title: string;
  image: string;
  imageAlt: string;
  marker?: MarkerPoint;
  fallbackText: string;
  legend: string;
}

export const MapWithMarker = ({
  title,
  image,
  imageAlt,
  marker,
  fallbackText,
  legend,
}: MapWithMarkerProps) => (
  <section className="map-card">
    <h3>{title}</h3>
    <div className="map-wrapper">
      <img src={image} alt={imageAlt} loading="lazy" />
      {marker ? (
        <span
          className="map-pin"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          aria-label="Location marker"
        />
      ) : (
        <div className="map-fallback">{fallbackText}</div>
      )}
    </div>
    <p className="legend">{legend}</p>
  </section>
);

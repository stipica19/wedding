"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { FeatureCollection, Point } from "geojson";

type GeoJSONFeatureCollection = FeatureCollection<
  Point,
  {
    name: string;
    description?: string;
  }
>;

export default function MapClient() {
  const locations: GeoJSONFeatureCollection = useMemo(
    () => ({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "Nikolina Komarac", // description: "Opis prve lokacije"
          },
          geometry: { type: "Point", coordinates: [17.626659, 43.923759] },
        },
        {
          type: "Feature",
          properties: {
            name: "Ivan Milić",
            //description: "Opis druge lokacije",
          },
          geometry: { type: "Point", coordinates: [17.597343, 43.940778] },
        },
        {
          type: "Feature",
          properties: {
            name: "Svadbeni salon “RITUAL”",
            // description: "Opis treće lokacije",
          },
          geometry: { type: "Point", coordinates: [17.5584363, 43.9455392] },
        },
        {
          type: "Feature",
          properties: {
            name: "Crkva",
            description: "UZNESENJA BLAŽENE DJEVICE MARIJE",
          },
          geometry: { type: "Point", coordinates: [17.5824743, 43.9386767] },
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    // Leaflet default icon fix (Next/Webpack često ne nađe ikonice)
    // Najjednostavnije: koristi CDN ikonice
    const DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    (L.Marker.prototype as any).options.icon = DefaultIcon;

    const map = L.map("map", {
      center: [45.815, 15.9819],
      zoom: 13,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const layer = L.geoJSON(locations, {
      onEachFeature: (feature, lyr) => {
        const { name, description } = feature.properties;
        lyr.bindPopup(`<strong>${name}</strong><br/>${description ?? ""}`);
      },
    }).addTo(map);

    // Auto-zoom da stane svih 4 pina
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds.pad(0.2));

    return () => {
      map.remove();
    };
  }, [locations]);

  return (
    <div
      id="map"
      style={{
        height: 500,
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
      }}
    />
  );
}

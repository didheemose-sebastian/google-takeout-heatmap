import Map, { useControl } from "react-map-gl/mapbox";
import { MapboxOverlay } from "@deck.gl/mapbox";
// import type { MapboxOverlayProps } from "@deck.gl/mapbox";
import type { DeckProps } from "@deck.gl/core";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import "mapbox-gl/dist/mapbox-gl.css";

// type BikeRack = {
//   ADDRESS: string;
//   SPACES: number;
//   COORDINATES: [longitude: number, latitude: number];
// };

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function App() {
  const layers = new HeatmapLayer({
    id: "HeatmapLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",
    aggregation: "SUM",
    getPosition: (d) => d.COORDINATES,
    getWeight: (d) => d.SPACES,
    radiusPixels: 25,
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        initialViewState={{
          longitude: -122.45,
          latitude: 37.75,
          zoom: 12,
          pitch: 0,
          bearing: 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      >
        <DeckGLOverlay layers={[layers]} />
      </Map>
    </div>
  );
}

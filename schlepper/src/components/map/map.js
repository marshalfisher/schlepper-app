import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { useState, useRef, useCallback } from 'react';
import MapGL, { FullscreenControl, GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = ({ position, onSearchLocation }) => {
  const [viewport, setViewport] = useState({
    latitude: Number(position.latitude),
    longitude: Number(position.longitude),
    zoom: 12.5,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(newViewport => setViewport(newViewport), []);

  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const fullscreenControlStyle = {
    right: 10,
    top: 10,
  };
  return (
    <div style={{ margin: '20px' }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width='400px'
        height='400px'
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <GeolocateControl
          style={{ bottom: '-50px' }}
          trackUserLocation={true}
          showAccuracyCircle={false}
          auto
        />
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position='top-left'
          placeholder='Choose location'
          onResult={onSearchLocation}
          // countries='us'
        />
        <FullscreenControl style={fullscreenControlStyle} />
      </MapGL>
    </div>
  );
};

export default Map;

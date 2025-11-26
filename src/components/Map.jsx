// src/components/Map.jsx
import React, { useEffect, useRef } from 'react'

// Google Maps integration: requires a valid API key in VITE_GOOGLE_MAPS_API_KEY
// This component loads the Maps script and renders a single marker.
export default function Map({ center = { lat: -4.0435, lng: 39.6682 }, zoom = 7, marker }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    let script = document.querySelector('script[data-google-maps]')
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const url = `https://maps.googleapis.com/maps/api/js?key=${key}`

    function initMap() {
      if (!mapRef.current) return
      mapInstanceRef.current = new google.maps.Map(mapRef.current, { center, zoom })
      if (marker) {
        markerRef.current = new google.maps.Marker({ position: marker, map: mapInstanceRef.current })
      }
    }

    if (!script) {
      script = document.createElement('script')
      script.src = url
      script.async = true
      script.dataset.googleMaps = 'true'
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      // already loaded
      initMap()
    }

    return () => {
      // Cleanup: nothing specific for Google Maps on unmount
    }
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(center)
      if (marker) {
        if (!markerRef.current) {
          markerRef.current = new google.maps.Marker({ position: marker, map: mapInstanceRef.current })
        } else {
          markerRef.current.setPosition(marker)
        }
      }
    }
  }, [center, marker])

  return <div role="img" aria-label="Map showing current location" style={{ height: '360px' }} className="card map-card" ref={mapRef} />
}

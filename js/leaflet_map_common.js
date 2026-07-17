/**
 * Shared Sales Leaflet Configurations
 */
window.UnileverSalesMapLib = {
  stationLocations: [
    { name: '🏢 KTM HQ (Origin)', latlng: [27.7172, 85.3240] },
    { name: '🏢 Hetauda Station', latlng: [27.4277, 85.0315] },
    { name: '🏢 Birgunj Station', latlng: [27.0125, 84.8767] },
    { name: '🏢 Pokhara Station', latlng: [28.2096, 83.9856] },
    { name: '🏢 Butwal Station', latlng: [27.7006, 83.4484] },
    { name: '🏢 Nepalgunj Station', latlng: [28.0500, 81.6167] },
    { name: '🏢 Biratnagar Station', latlng: [26.4525, 87.2718] }
  ],
  
  getMarkerIcon(statusClass) {
    let color = '#1D9E75'; 
    if (statusClass === 'red') color = '#EF4444';
    if (statusClass === 'orange') color = '#F0A500';
    
    return L.divIcon({
      html: `<div title="Fix Time&#10;04/03/2026, 08:01:08 AM" style="background-color: ${color}; width: 26px; height: 26px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 13px; cursor: help;">Description: 🚛</div>`,
      className: 'custom-map-marker',
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });
  }
};
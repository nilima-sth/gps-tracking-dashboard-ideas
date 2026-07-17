/**
 * Shared Sales Leaflet Configurations - Production Ready
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
    let color = '#1D9E75'; // Odoo Teal
    if (statusClass === 'red') color = '#EF4444'; // Red Alert[cite: 9]
    if (statusClass === 'orange') color = '#F0A500'; // Amber Alert[cite: 9]
    
    return L.divIcon({
      html: `
        <div style="position: relative; width: 28px; height: 28px;">
          <div style="position: absolute; top: -2px; left: -2px; width: 32px; height: 32px; border-radius: 50%; border: 3px solid ${color}; animation: ringPulse 1.8s ease-out infinite; pointer-events: none;"></div>
          <div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 2.5px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: #fff;">
            <i class="fa-solid fa-truck" style="font-size: 11px;"></i>
          </div>
        </div>`,
      className: 'custom-map-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  }
};
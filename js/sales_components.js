/**
 * Odoo 19 Sales Portal — Component Lifecycle Registry
 */
(function () {
  'use strict';

  window.OdooSalesComponents = {
    init_live_tracking() {
      const db = window.UNILEVER_GLOBAL_DB;
      if (!db) return;

      const mapContainer = document.getElementById('map');
      if (!mapContainer) return;

      // Leaflet Initialization
      const map = L.map('map', { zoomControl: false }).setView([27.6, 85.25], 9);
      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      const routesGroup = L.layerGroup().addTo(map);

      // Render Stations
      const stations = window.UnileverSalesMapLib?.stationLocations || [];
      stations.forEach(s => {
        L.marker(s.latlng, {
          icon: L.divIcon({
            html: `<div style="background-color: rgba(255, 255, 255, 0.95); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; font-size: 10px; font-weight: 700; color: var(--purple); box-shadow: 0 1px 3px rgba(0,0,0,0.15); white-space: nowrap;">${s.name}</div>`,
            className: 'station-label-marker',
            iconSize: [120, 18],
            iconAnchor: [60, 9]
          })
        }).addTo(map);
      });

      // Render Active Fleet Routes & Markers
      Object.keys(db.dispatches).forEach(key => {
        const d = db.dispatches[key];

        if (d.routePoints && d.routePoints.length > 0) {
          L.polyline(d.routePoints, {
            color: '#714B67',
            weight: 3,
            dashArray: '5, 5',
            opacity: 0.55
          }).addTo(routesGroup);
        }

        const marker = L.marker(d.latlng, { 
          icon: window.UnileverSalesMapLib?.getMarkerIcon(d.statusClass) 
        });

        const popupHtml = `
          <div style="font-family: 'DM Sans', sans-serif; min-width: 200px;">
            <div style="font-weight: 700; font-size: 12px; color: #714B67; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 6px;">${d.id}</div>
            <div style="font-size: 11px; line-height: 1.4;">
              <b>Distributor:</b> ${d.distributor}<br/>
              <b>Route:</b> ${d.route}<br/>
              <b>ETA:</b> ${d.eta}<br/>
              <b>Volume:</b> ${d.volume}<br/>
              <b>Status:</b> <span class="badge ${d.statusClass === 'green' ? 'on-time' : 'delayed'}">${d.status}</span>
            </div>
          </div>
        `;
        marker.bindPopup(popupHtml);
        marker.addTo(markersGroup);

        marker.on('click', () => {
          document.getElementById('overlay-truck-id').innerText = `${d.id} (${d.status})`;
          document.getElementById('overlay-route').innerText = `Route: ${d.route}`;
          document.getElementById('overlay-speed').innerText = d.eta;
          document.getElementById('overlay-distributor').innerText = `Distributor: ${d.distributor}`;
          
          const dot = document.getElementById('overlay-dot');
          dot.className = 'info-dot ' + (d.statusClass === 'green' ? 'active' : 'delayed');
        });
      });

      // Bind dropdown navigator
      window.navigateToStation = function(code) {
        if (!code) {
          map.setView([27.6, 85.25], 9);
          return;
        }
        const s = db.stationsNav[code];
        if (s) {
          map.flyTo(s.latlng, s.zoom, { animate: true, duration: 1.2 });
        }
      };
    },

    init_my_distributors() {
      const db = window.UNILEVER_GLOBAL_DB;
      const container = document.getElementById('distributors-table-body');
      if (!container) return;

      container.innerHTML = '';
      db.distributors.forEach(d => {
        const row = document.createElement('tr');
        const statusBadge = d.status === 'active' || d.status === 'arriving'
          ? '<span class="badge on-time"><i class="fa-solid fa-circle-check"></i> Connected</span>'
          : d.status === 'delayed'
            ? '<span class="badge delayed"><i class="fa-solid fa-triangle-exclamation"></i> Delay Alert</span>'
            : '<span class="badge in-transit">Pending Dispatch</span>';

        row.innerHTML = `
          <td><strong>${d.name}</strong></td>
          <td>${d.contact}</td>
          <td>${d.phone}</td>
          <td>${statusBadge}</td>
          <td style="font-size:11.5px; color:var(--text-muted);">${d.meta}</td>
        `;
        container.appendChild(row);
      });
    },

    init_my_deliveries() {
      const db = window.UNILEVER_GLOBAL_DB;
      const container = document.getElementById('deliveries-table-body');
      if (!container) return;

      container.innerHTML = '';
      Object.keys(db.dispatches).forEach(key => {
        const d = db.dispatches[key];
        const row = document.createElement('tr');
        const badgeClass = d.statusClass === 'green' ? 'in-transit' : 'delayed';
        const icon = d.statusClass === 'green' ? 'fa-truck' : 'fa-triangle-exclamation';

        row.innerHTML = `
          <td><strong>${d.distributor}</strong></td>
          <td><a class="o-link" href="#">${d.id}</a></td>
          <td>${d.route}</td>
          <td>${d.eta.split(' · ')[0]}</td>
          <td>${d.volume}</td>
          <td><span class="badge ${badgeClass}"><i class="fa-solid ${icon}"></i> ${d.status}</span></td>
          <td><button class="btn-notify" onclick="openSmsWizard('${d.distributor}', '${d.id}', '${d.eta.split(' · ')[0]}')"><i class="fa-solid fa-comment-sms"></i> Notify</button></td>
        `;
        container.appendChild(row);
      });
    },

    init_sms_notifications() {
      const db = window.UNILEVER_GLOBAL_DB;
      const selector = document.getElementById('sms-target-selector');
      if (!selector) return;

      selector.innerHTML = '<option value="">Select Target Destination Account...</option>';
      Object.keys(db.dispatches).forEach(key => {
        const d = db.dispatches[key];
        const opt = document.createElement('option');
        opt.value = key;
        opt.innerText = `${d.distributor} (${d.id})`;
        selector.appendChild(opt);
      });

      window.updateSmsPreview = function (key) {
        const textarea = document.getElementById('sms-body-preview');
        if (!key) {
          textarea.value = '';
          return;
        }
        const d = db.dispatches[key];
        textarea.value = `Dear Partner,\n\nYour Unilever Nepal delivery (Ref: ${d.id}) is expected to arrive by ${d.eta.split(' · ')[0]}.\n\nTrack progress: https://unilevernepal.com/track/xz7k9m2q`;
      };
    }
  };
})();
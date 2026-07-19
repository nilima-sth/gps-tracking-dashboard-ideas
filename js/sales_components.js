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

      // Re-initialize map to avoid Leaflet container-already-initialized errors
      const mapWrapper = mapContainer.parentNode;
      mapContainer.remove();
      const newMapContainer = document.createElement('div');
      newMapContainer.id = 'map';
      newMapContainer.style.width = '100%';
      newMapContainer.style.height = '100%';
      newMapContainer.style.zIndex = '1';
      mapWrapper.insertBefore(newMapContainer, mapWrapper.firstChild);

      // Render KPIs
      const metrics = db.metrics || {};
      const delVal = document.getElementById('kpi-del-val');
      const delSub = document.getElementById('kpi-del-sub');
      const delayVal = document.getElementById('kpi-delay-val');
      const delaySub = document.getElementById('kpi-delay-sub');
      const volVal = document.getElementById('kpi-vol-val');
      const volSub = document.getElementById('kpi-vol-sub');
      const otVal = document.getElementById('kpi-ot-val');
      const otSub = document.getElementById('kpi-ot-sub');

      if (delVal) delVal.innerText = metrics.deliveriesToday || 0;
      if (delSub) delSub.innerHTML = `<i class="fa-solid fa-location-dot"></i> Scoped to ${db.session.scope}`;
      
      if (delayVal) delayVal.innerText = metrics.delayedOrders || 0;
      if (delaySub) {
        if (metrics.delayedOrders > 0) {
          const firstDelayed = Object.values(db.dispatches).find(disp => disp.statusClass === 'red');
          if (firstDelayed) {
            delaySub.innerText = `${firstDelayed.distributor.split(' ')[0]} · +${firstDelayed.delayMinutes}m delay`;
          } else {
            delaySub.innerText = `${metrics.delayedOrders} clients affected`;
          }
          delaySub.style.color = 'var(--red)';
        } else {
          delaySub.innerText = 'All clients on schedule';
          delaySub.style.color = 'var(--teal)';
        }
      }
      
      if (volVal) {
        const valLakhs = (metrics.valueTransitNpr / 100000).toFixed(1);
        volVal.innerHTML = `${metrics.volumeTransitKg} <span style="font-size:13px; font-weight:400; color:var(--text-muted)">kg (NPR ${valLakhs}L)</span>`;
      }
      if (volSub) volSub.innerText = `Across ${Object.keys(db.dispatches).length} active dispatches`;

      if (otVal) otVal.innerText = `${metrics.onTimeRateWeekly || 90}%`;
      if (otSub) otSub.innerText = `SLA compliance score`;

      // Set Map View based on Scoped Region Center
      const mapCenter = db.mapCenter || [27.6, 85.25];
      const mapZoom = db.mapZoom || 9;
      
      const map = L.map('map', { zoomControl: false }).setView(mapCenter, mapZoom);
      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      const routesGroup = L.layerGroup().addTo(map);

      // Render Stations (Filtered by Scope to keep view localized)
      const currentId = db.session.salespersonId;
      const stations = window.UnileverSalesMapLib?.stationLocations || [];
      stations.forEach(s => {
        const isKtm = s.name.includes("KTM");
        const isHet = s.name.includes("Hetauda");
        const isBnp = s.name.includes("Banepa");
        
        // Show depots relevant to the territory
        let shouldShowDepot = isKtm;
        if (currentId === 'A') {
          if (isHet || isBnp) shouldShowDepot = true;
        } else {
          if (!isHet && !isBnp) shouldShowDepot = true;
        }

        if (shouldShowDepot) {
          L.marker(s.latlng, {
            icon: L.divIcon({
              html: `<div style="background-color: rgba(255, 255, 255, 0.95); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; font-size: 10px; font-weight: 700; color: var(--purple); box-shadow: 0 1px 3px rgba(0,0,0,0.15); white-space: nowrap;">${s.name}</div>`,
              className: 'station-label-marker',
              iconSize: [120, 18],
              iconAnchor: [60, 9]
            })
          }).addTo(map);
        }
      });

      // Populate Station Navigator Dropdown Dynamically
      const navigatorDropdown = document.getElementById('station-navigator');
      if (navigatorDropdown) {
        navigatorDropdown.innerHTML = '<option value="">🗺️ Navigate to Station...</option>';
        Object.keys(db.stationsNav).forEach(k => {
          const s = db.stationsNav[k];
          const isKtm = (k === 'ktm');
          const isA_Depot = (k === 'het' || k === 'bnp');
          
          if (isKtm || (currentId === 'A' && isA_Depot) || (currentId === 'B' && !isA_Depot && k !== 'bnp')) {
            const opt = document.createElement('option');
            opt.value = k;
            opt.innerText = s.label;
            navigatorDropdown.appendChild(opt);
          }
        });
      }

      // Render Active Scoped Fleet Routes & Markers (Simplified for Sales, Hiding raw telematics)
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

        const statusText = d.statusClass === 'red'
          ? `Delayed - ETA pushed back ${d.delayMinutes} mins`
          : `On Time - ETA ${d.eta.split(' · ')[0]}`;

        const popupHtml = `
          <div style="font-family: 'DM Sans', sans-serif; min-width: 210px;">
            <div style="font-weight: 700; font-size: 12px; color: #714B67; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 6px;">${d.id}</div>
            <div style="font-size: 11px; line-height: 1.4;">
              <b>Distributor:</b> ${d.distributor}<br/>
              <b>Route:</b> ${d.route}<br/>
              <b>ETA:</b> ${d.eta.split(' · ')[0]}<br/>
              <b>Payload Weight:</b> ${d.volume}<br/>
              <b>Status:</b> <span class="badge ${d.statusClass === 'green' ? 'on-time' : 'delayed'}" style="margin-top: 4px;">${statusText}</span>
            </div>
          </div>
        `;
        marker.bindPopup(popupHtml);
        marker.addTo(markersGroup);

        marker.on('click', () => {
          document.getElementById('overlay-truck-id').innerText = `${d.id} (${d.statusClass === 'green' ? 'On Time' : 'Delayed'})`;
          document.getElementById('overlay-route').innerText = `Route: ${d.route}`;
          document.getElementById('overlay-speed').innerText = `Status: ${statusText}`;
          document.getElementById('overlay-distributor').innerText = `Distributor: ${d.distributor} - ${d.contact}`;
          
          const dot = document.getElementById('overlay-dot');
          dot.className = 'info-dot ' + (d.statusClass === 'green' ? 'active' : 'delayed');
        });
      });

      // Bind dropdown navigator
      window.navigateToStation = function(code) {
        if (!code) {
          map.setView(mapCenter, mapZoom);
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

      const title = document.getElementById('distributors-page-title');
      if (title) {
        title.innerText = `Distributor Ledger — ${db.session.scope}`;
      }

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

        let statusLabel = d.status;
        if (d.statusClass === 'red' && d.delayMinutes) {
          const hrs = Math.floor(d.delayMinutes / 60);
          const mins = d.delayMinutes % 60;
          statusLabel = `Delayed by ${hrs > 0 ? hrs + 'h ' : ''}${mins}m`;
        }

        row.innerHTML = `
          <td><strong>${d.distributor}</strong><br><span style="font-size:11px; color:var(--text-muted);"><i class="fa-regular fa-user"></i> ${d.contact}</span></td>
          <td><a class="o-link" href="#">${d.id}</a></td>
          <td>${d.route}</td>
          <td><strong>${d.eta.split(' · ')[0]}</strong></td>
          <td>${d.volume}</td>
          <td><span class="badge ${badgeClass}"><i class="fa-solid ${icon}"></i> ${statusLabel}</span></td>
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
        if (d.statusClass === 'red') {
          textarea.value = `Dear Partner,\n\nWe apologize for the delay. Your Unilever Nepal delivery (Ref: ${d.id}) has been delayed and is now expected to arrive by ${d.eta.split(' · ')[0]}.\n\nTrack progress: http://127.0.0.1:8000/dashboard_distributor.html`;
        } else {
          textarea.value = `Dear Partner,\n\nYour Unilever Nepal delivery (Ref: ${d.id}) is en route and expected to arrive by ${d.eta.split(' · ')[0]}.\n\nTrack progress: http://127.0.0.1:8000/dashboard_distributor.html`;
        }
      };

      window.executeMessageBroadcast = function(channel) {
        const selector = document.getElementById('sms-target-selector');
        if (!selector || !selector.value) {
          alert('Please select a target destination account first.');
          return;
        }
        const key = selector.value;
        const d = db.dispatches[key];
        const textarea = document.getElementById('sms-body-preview');
        const messageText = textarea ? textarea.value : '';

        if (d && messageText) {
          const distName = d.distributor;
          const sender = db.session.role || 'Salesperson';
          const msgKey = 'unilever_messages_' + distName.replace(/\s+/g, '_');
          let messages = [];
          try {
            messages = JSON.parse(localStorage.getItem(msgKey)) || [];
          } catch(e) {}
          
          messages.push({
            sender: sender,
            message: messageText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            channel: channel
          });
          
          localStorage.setItem(msgKey, JSON.stringify(messages));
          window.dispatchEvent(new Event('storage'));
        }

        const t = document.getElementById('toast');
        if (t) {
          t.innerHTML = `<i class="fa-solid fa-check"></i> Message sent successfully via ${channel}`;
          t.style.display = 'block';
          setTimeout(() => t.style.display = 'none', 3000);
        }
        selector.value = '';
        if (textarea) textarea.value = '';
      };
    },

    init_sales_orders() {
      const db = window.UNILEVER_GLOBAL_DB;

      // Populate integrated revenue metrics
      const grossToday = document.getElementById('rev-gross-today');
      const targetAtt = document.getElementById('rev-target-attainment');
      const grossLabel = document.getElementById('rev-gross-label');
      
      if (grossToday) grossToday.innerText = db.revenue?.grossToday || 'NPR 0.00';
      if (targetAtt) targetAtt.innerText = db.revenue?.targetAttainment || 'NPR 0.00';
      if (grossLabel) grossLabel.innerText = `${db.session.scope} Gross Volume Dispatched (Today)`;

      const container = document.getElementById('orders-table-body');
      if (!container) return;

      container.innerHTML = '';
      const orders = db.salesOrders || [];
      orders.forEach(o => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><a class="o-link" href="#">${o.ref}</a></td>
          <td><strong>${o.distributor}</strong></td>
          <td>${o.date}</td>
          <td>${o.units}</td>
          <td>${o.value}</td>
          <td><span class="badge ${o.statusClass === 'on-time' ? 'on-time' : 'in-transit'}"><i class="fa-solid ${o.icon}"></i> ${o.status}</span></td>
        `;
        container.appendChild(row);
      });
    },

    init_revenue_territory() {
      const db = window.UNILEVER_GLOBAL_DB;
      const grossToday = document.getElementById('rev-gross-today');
      const targetAtt = document.getElementById('rev-target-attainment');
      const grossLabel = document.getElementById('rev-gross-label');
      
      if (grossToday) grossToday.innerText = db.revenue?.grossToday || 'NPR 0.00';
      if (targetAtt) targetAtt.innerText = db.revenue?.targetAttainment || 'NPR 0.00';
      if (grossLabel) grossLabel.innerText = `${db.session.scope} Gross Volume Dispatched (Today)`;
    },

    init_performance_kpis() {
      const db = window.UNILEVER_GLOBAL_DB;
      const sla = document.getElementById('kpi-sla-pct');
      const delay = document.getElementById('kpi-avg-delay');
      const sat = document.getElementById('kpi-sat-index');
      
      if (sla) sla.innerText = db.kpis?.sla || '0.0%';
      if (delay) delay.innerText = db.kpis?.delay || '0 Mins';
      if (sat) sat.innerText = db.kpis?.satIndex || '0.00 / 5.00';

      // Initialize Odoo-style SLA fulfillment compliance trend line graph
      const ctx = document.getElementById('slaTrendChart');
      if (ctx) {
        if (window.mySlaChart) {
          window.mySlaChart.destroy();
        }

        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const chartData = db.session.salespersonId === 'A' 
          ? [92, 94, 91, 95, 96, 93, 94]
          : [88, 89, 92, 90, 91, 87, 89];

        const canvasCtx = ctx.getContext('2d');
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, 220);
        gradient.addColorStop(0, 'rgba(113, 75, 103, 0.28)');
        gradient.addColorStop(0.5, 'rgba(113, 75, 103, 0.08)');
        gradient.addColorStop(1, 'rgba(113, 75, 103, 0.0)');

        window.mySlaChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'SLA Fulfillment Rate (%)',
              data: chartData,
              borderColor: '#714B67', // Odoo Purple
              backgroundColor: gradient,
              borderWidth: 3.5,
              tension: 0.38,
              fill: true,
              pointBackgroundColor: '#FFFFFF',
              pointBorderColor: '#1D9E75', // Odoo Teal
              pointBorderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointHoverBackgroundColor: '#1D9E75',
              pointHoverBorderColor: '#FFFFFF',
              pointHoverBorderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                backgroundColor: '#1E293B',
                titleColor: '#F9FAFB',
                bodyColor: '#F3F4F6',
                bodyFont: {
                  family: "'DM Sans', sans-serif",
                  size: 11,
                  weight: '600'
                },
                padding: 10,
                cornerRadius: 6,
                displayColors: false,
                callbacks: {
                  label: function(context) {
                    return `SLA Fulfillment: ${context.parsed.y}%`;
                  }
                }
              }
            },
            scales: {
              y: {
                min: 80,
                max: 100,
                grid: {
                  color: 'rgba(226, 232, 240, 0.6)',
                  drawTicks: false
                },
                border: {
                  dash: [5, 5],
                  display: false
                },
                ticks: {
                  padding: 8,
                  font: {
                    family: "'DM Sans', sans-serif",
                    size: 10,
                    weight: '500'
                  },
                  color: '#64748B'
                }
              },
              x: {
                grid: {
                  display: false
                },
                border: {
                  display: false
                },
                ticks: {
                  padding: 8,
                  font: {
                    family: "'DM Sans', sans-serif",
                    size: 10,
                    weight: '500'
                  },
                  color: '#64748B'
                }
              }
            }
          }
        });
      }
    }
  };
})();
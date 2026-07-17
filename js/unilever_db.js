/**
 * Shared Local Database – Sales & Territory Datasets
 */
window.UNILEVER_SALES_DB = {
  dispatches: {
    'WH-OUT-00142': { 
      id: 'WH/OUT/00142', 
      distributor: 'Hetauda Merchants Ltd.', 
      order: 'WH/OUT/00142', 
      route: 'KTM → HET', 
      contact: 'Ram Prasad (01-451xxxx)', 
      eta: '14:30 · 1h 12m away', 
      volume: '180 kg', 
      status: 'In Transit', 
      statusClass: 'green', 
      latlng: [27.50, 85.12], 
      routePoints: [[27.7172, 85.3240], [27.4277, 85.0315]] 
    },
    'WH-OUT-00138': { 
      id: 'WH/OUT/00138', 
      distributor: 'Naubise Supply Hub', 
      order: 'WH/OUT/00138', 
      route: 'KTM → PKR', 
      contact: 'Kiran KC (01-522xxxx)', 
      eta: '15:45 · DELAYED +1h 20m', 
      volume: '160 kg', 
      status: 'Delayed', 
      statusClass: 'red', 
      latlng: [27.72, 85.16], 
      routePoints: [[27.7172, 85.3240], [27.7145, 85.1633]] 
    },
    'WH-OUT-00140': { 
      id: 'WH/OUT/00140', 
      distributor: 'Birgunj Traders Co.', 
      order: 'WH/OUT/00140', 
      route: 'KTM → BGR', 
      contact: 'Sita Devi (051-xxx)', 
      eta: '16:15 · 3h 57m away', 
      volume: '220 kg', 
      status: 'In Transit', 
      statusClass: 'green', 
      latlng: [27.20, 84.97], 
      routePoints: [[27.7172, 85.3240], [27.4277, 85.0315], [27.0125, 84.8767]] 
    },
    'WH-OUT-00144': { 
      id: 'WH/OUT/00144', 
      distributor: 'Banepa District Wholesale', 
      order: 'WH/OUT/00144', 
      route: 'KTM → BNP', 
      contact: 'Mohan Shrestha', 
      eta: '13:20 · 22m', 
      volume: '150 kg', 
      status: 'Arriving Soon', 
      statusClass: 'green', 
      latlng: [27.65, 85.48], 
      routePoints: [[27.7172, 85.3240], [27.6298, 85.5214]] 
    },
    'WH-OUT-00148': { 
      id: 'WH/OUT/00148', 
      distributor: 'North Valley Traders', 
      order: 'WH/OUT/00148', 
      route: 'KTM → SDN', 
      contact: 'Priya Bajracharya', 
      eta: '12:55 · 5m', 
      volume: '140 kg', 
      status: 'Arriving Now', 
      statusClass: 'green', 
      latlng: [27.74, 85.38], 
      routePoints: [[27.7172, 85.3240], [27.7635, 85.4243]] 
    }
  },
  stationsNav: {
    ktm: { latlng: [27.7172, 85.3240], zoom: 12, label: '🏢 Kathmandu HQ (Origin)' },
    het: { latlng: [27.4277, 85.0315], zoom: 12, label: '🏢 Hetauda Station' },
    bgr: { latlng: [27.0125, 84.8767], zoom: 12, label: '🏢 Birgunj Station' },
    pkr: { latlng: [28.2096, 83.9856], zoom: 12, label: '🏢 Pokhara Station' },
    btw: { latlng: [27.7006, 83.4484], zoom: 12, label: '🏢 Butwal Station' },
    npj: { latlng: [28.0500, 81.6167], zoom: 12, label: '🏢 Nepalgunj Station' },
    brt: { latlng: [26.4525, 87.2718], zoom: 12, label: '🏢 Biratnagar Station' }
  }
};
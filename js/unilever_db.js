/**
 * Global Enterprise Database State Engine (SSOT)
 */
window.UNILEVER_GLOBAL_DB = {
  session: {
    user: "Saurav Pradhan",
    role: "Regional Sales Manager",
    scope: "Bagmati Province",
    rule: "ir.rule: user_id = current_user",
    salespersonId: "A"
  },
  metrics: {
    deliveriesToday: 4,
    delayedOrders: 1,
    volumeTransitKg: 630,
    valueTransitNpr: 1780000,
    onTimeRateWeekly: 92.5
  },
  dispatches: {
    'WH-OUT-00142': { id: 'WH/OUT/00142', distributor: 'Hetauda Merchants Ltd.', order: 'WH/OUT/00142', route: 'KTM → HET', contact: 'Ram Prasad', eta: '14:30 · 1h 12m away', volume: '180 kg', status: 'In Transit', statusClass: 'green', latlng: [27.50, 85.12], routePoints: [[27.7172, 85.3240], [27.4277, 85.0315]], delayMinutes: 0 },
    'WH-OUT-00138': { id: 'WH/OUT/00138', distributor: 'Naubise Supply Hub', order: 'WH/OUT/00138', route: 'KTM → NUB', contact: 'Kiran KC', eta: '15:45 · DELAYED +1h 20m', volume: '160 kg', status: 'Delayed', statusClass: 'red', latlng: [27.80, 85.20], routePoints: [[27.7172, 85.3240], [27.8012, 85.2015]], delayMinutes: 80 },
    'WH-OUT-00144': { id: 'WH/OUT/00144', distributor: 'Banepa District Wholesale', order: 'WH/OUT/00144', route: 'KTM → BNP', contact: 'Mohan Shrestha', eta: '13:20 · 22m away', volume: '150 kg', status: 'Arriving Soon', statusClass: 'green', latlng: [27.65, 85.48], routePoints: [[27.7172, 85.3240], [27.6298, 85.5214]], delayMinutes: 0 },
    'WH-OUT-00148': { id: 'WH/OUT/00148', distributor: 'North Valley Traders', order: 'WH/OUT/00148', route: 'KTM → SDN', contact: 'Priya Bajracharya', eta: '12:55 · Arrived', volume: '140 kg', status: 'Arriving Now', statusClass: 'green', latlng: [27.74, 85.38], routePoints: [[27.7172, 85.3240], [27.7635, 85.4243]], delayMinutes: 0 }
  },
  distributors: [
    { name: 'Hetauda Merchants Ltd.', phone: '01-451xxxx', contact: 'Ram Prasad', status: 'active', meta: '📦 WH/OUT/00142 · ETA 14:30', lastDispatch: 'Today' },
    { name: 'Naubise Supply Hub', phone: '01-522xxxx', contact: 'Kiran KC', status: 'delayed', meta: '⏰ WH/OUT/00138 · +1h 20m delay', lastDispatch: 'Today' },
    { name: 'Banepa District Wholesale', phone: '011-xxxxx', contact: 'Mohan Shrestha', status: 'active', meta: '📦 WH/OUT/00144 · Arriving 13:20', lastDispatch: 'Today' },
    { name: 'North Valley Traders', phone: '01-xxxxx', contact: 'Priya Bajracharya', status: 'arriving', meta: '✅ WH/OUT/00148 · Now (12:55)', lastDispatch: 'Today' },
    { name: 'Lalitpur General Store', phone: '01-553xxxx', contact: 'Sarita Thapa', status: 'pending', meta: '⏳ Next dispatch: Tomorrow', lastDispatch: '3 days ago' },
    { name: 'Bhaktapur Wholesale Hub', phone: '01-661xxxx', contact: 'Dinesh Maharjan', status: 'pending', meta: '⏳ Next dispatch: Tomorrow', lastDispatch: '5 days ago' }
  ],
  stationsNav: {
    ktm: { latlng: [27.7172, 85.3240], zoom: 12, label: '🏢 Kathmandu HQ (Origin)' },
    het: { latlng: [27.4277, 85.0315], zoom: 12, label: '🏢 Hetauda Station' },
    bgr: { latlng: [27.0125, 84.8767], zoom: 12, label: '🏢 Birgunj Station' },
    pkr: { latlng: [28.2096, 83.9856], zoom: 12, label: '🏢 Pokhara Station' },
    btw: { latlng: [27.7006, 83.4484], zoom: 12, label: '🏢 Butwal Station' },
    npj: { latlng: [28.0500, 81.6167], zoom: 12, label: '🏢 Nepalgunj Station' },
    brt: { latlng: [26.4525, 87.2718], zoom: 12, label: '🏢 Biratnagar Station' }
  },
  
  // Scoped data profiles for the team
  salespersons: {
    "A": {
      user: "Saurav Pradhan",
      role: "Regional Sales Manager",
      scope: "Bagmati Province",
      rule: "ir.rule: user_id = current_user",
      metrics: {
        deliveriesToday: 4,
        delayedOrders: 1,
        volumeTransitKg: 630,
        valueTransitNpr: 1780000,
        onTimeRateWeekly: 92.5
      },
      distributors: [
        { name: 'Hetauda Merchants Ltd.', phone: '01-451xxxx', contact: 'Ram Prasad', status: 'active', meta: '📦 WH/OUT/00142 · ETA 14:30', lastDispatch: 'Today' },
        { name: 'Naubise Supply Hub', phone: '01-522xxxx', contact: 'Kiran KC', status: 'delayed', meta: '⏰ WH/OUT/00138 · +1h 20m delay', lastDispatch: 'Today' },
        { name: 'Banepa District Wholesale', phone: '011-xxxxx', contact: 'Mohan Shrestha', status: 'active', meta: '📦 WH/OUT/00144 · Arriving 13:20', lastDispatch: 'Today' },
        { name: 'North Valley Traders', phone: '01-xxxxx', contact: 'Priya Bajracharya', status: 'arriving', meta: '✅ WH/OUT/00148 · Now (12:55)', lastDispatch: 'Today' },
        { name: 'Lalitpur General Store', phone: '01-553xxxx', contact: 'Sarita Thapa', status: 'pending', meta: '⏳ Next dispatch: Tomorrow', lastDispatch: '3 days ago' },
        { name: 'Bhaktapur Wholesale Hub', phone: '01-661xxxx', contact: 'Dinesh Maharjan', status: 'pending', meta: '⏳ Next dispatch: Tomorrow', lastDispatch: '5 days ago' }
      ],
      dispatches: {
        'WH-OUT-00142': { id: 'WH/OUT/00142', distributor: 'Hetauda Merchants Ltd.', order: 'WH/OUT/00142', route: 'KTM → HET', contact: 'Ram Prasad', eta: '14:30 · 1h 12m away', volume: '180 kg', value: 'NPR 6,30,000', status: 'In Transit', statusClass: 'green', latlng: [27.50, 85.12], routePoints: [[27.7172, 85.3240], [27.4277, 85.0315]], delayMinutes: 0 },
        'WH-OUT-00138': { id: 'WH/OUT/00138', distributor: 'Naubise Supply Hub', order: 'WH/OUT/00138', route: 'KTM → NUB', contact: 'Kiran KC', eta: '15:45 · DELAYED +1h 20m', volume: '160 kg', value: 'NPR 4,20,000', status: 'Delayed', statusClass: 'red', latlng: [27.80, 85.20], routePoints: [[27.7172, 85.3240], [27.8012, 85.2015]], delayMinutes: 80 },
        'WH-OUT-00144': { id: 'WH/OUT/00144', distributor: 'Banepa District Wholesale', order: 'WH/OUT/00144', route: 'KTM → BNP', contact: 'Mohan Shrestha', eta: '13:20 · 22m away', volume: '150 kg', value: 'NPR 3,80,000', status: 'Arriving Soon', statusClass: 'green', latlng: [27.65, 85.48], routePoints: [[27.7172, 85.3240], [27.6298, 85.5214]], delayMinutes: 0 },
        'WH-OUT-00148': { id: 'WH/OUT/00148', distributor: 'North Valley Traders', order: 'WH/OUT/00148', route: 'KTM → SDN', contact: 'Priya Bajracharya', eta: '12:55 · Arrived', volume: '140 kg', value: 'NPR 3,50,000', status: 'Arriving Now', statusClass: 'green', latlng: [27.74, 85.38], routePoints: [[27.7172, 85.3240], [27.7635, 85.4243]], delayMinutes: 0 }
      },
      salesOrders: [
        { ref: 'SO-9923', distributor: 'Hetauda Merchants Ltd.', date: '17 July 2026', units: '1,280 Units', value: 'NPR 4,52,000.00', status: 'Fully Invoiced', statusClass: 'on-time', icon: 'fa-circle-check' },
        { ref: 'SO-9924', distributor: 'Naubise Supply Hub', date: '17 July 2026', units: '850 Units', value: 'NPR 3,10,000.00', status: 'Inventory Sourcing', statusClass: 'in-transit', icon: 'fa-spinner' }
      ],
      revenue: {
        grossToday: 'NPR 18,45,600.00',
        targetAttainment: 'NPR 1,24,50,000.00'
      },
      kpis: {
        sla: '94.2%',
        delay: '14.2 Mins',
        satIndex: '4.85 / 5.00'
      },
      mapCenter: [27.6, 85.25],
      mapZoom: 9
    },
    "B": {
      user: "Anil Gurung",
      role: "Territory Sales Lead",
      scope: "Gandaki & Madhesh Province",
      rule: "ir.rule: user_id = current_user",
      metrics: {
        deliveriesToday: 4,
        delayedOrders: 2,
        volumeTransitKg: 1180,
        valueTransitNpr: 4200000,
        onTimeRateWeekly: 85.0
      },
      distributors: [
        { name: 'Birgunj Traders Co.', phone: '051-xxxxx', contact: 'Sita Devi', status: 'active', meta: '📦 WH/OUT/00140 · ETA 16:15', lastDispatch: 'Today' },
        { name: 'Pokhara Valley Distributors', phone: '061-xxxxx', contact: 'Anil Gurung Jr.', status: 'delayed', meta: '⏰ WH/OUT/00155 · +45m delay', lastDispatch: 'Today' },
        { name: 'Butwal Wholesale Mart', phone: '071-xxxxx', contact: 'Rajesh Hamal', status: 'active', meta: '📦 WH/OUT/00160 · ETA 15:10', lastDispatch: 'Today' },
        { name: 'Nepalgunj Traders', phone: '081-xxxxx', contact: 'Gopal Hamal', status: 'delayed', meta: '⏰ WH/OUT/00165 · +1h 30m delay', lastDispatch: 'Today' },
        { name: 'Biratnagar Supply Hub', phone: '021-xxxxx', contact: 'Hari Bansha', status: 'pending', meta: '⏳ Next dispatch: Wednesday', lastDispatch: '8 days ago' }
      ],
      dispatches: {
        'WH-OUT-00140': { id: 'WH/OUT/00140', distributor: 'Birgunj Traders Co.', order: 'WH/OUT/00140', route: 'KTM → BGR', contact: 'Sita Devi', eta: '16:15 · 3h 57m away', volume: '220 kg', value: 'NPR 7,50,000', status: 'In Transit', statusClass: 'green', latlng: [27.20, 84.97], routePoints: [[27.7172, 85.3240], [27.4277, 85.0315], [27.0125, 84.8767]], delayMinutes: 0 },
        'WH-OUT-00155': { id: 'WH/OUT/00155', distributor: 'Pokhara Valley Distributors', order: 'WH/OUT/00155', route: 'KTM → PKR', contact: 'Anil Gurung Jr.', eta: '17:30 · DELAYED +45m', volume: '310 kg', value: 'NPR 11,20,000', status: 'Delayed', statusClass: 'red', latlng: [27.90, 84.30], routePoints: [[27.7172, 85.3240], [28.2096, 83.9856]], delayMinutes: 45 },
        'WH-OUT-00160': { id: 'WH/OUT/00160', distributor: 'Butwal Wholesale Mart', order: 'WH/OUT/00160', route: 'KTM → BTW', contact: 'Rajesh Hamal', eta: '15:10 · 2h 10m away', volume: '250 kg', value: 'NPR 8,80,000', status: 'In Transit', statusClass: 'green', latlng: [27.60, 83.90], routePoints: [[27.7172, 85.3240], [27.7006, 83.4484]], delayMinutes: 0 },
        'WH-OUT-00165': { id: 'WH/OUT/00165', distributor: 'Nepalgunj Traders', order: 'WH/OUT/00165', route: 'KTM → NPJ', contact: 'Gopal Hamal', eta: '19:45 · DELAYED +1h 30m', volume: '400 kg', value: 'NPR 14,50,000', status: 'Delayed', statusClass: 'red', latlng: [27.95, 82.20], routePoints: [[27.7172, 85.3240], [28.0500, 81.6167]], delayMinutes: 90 }
      },
      salesOrders: [
        { ref: 'SO-9930', distributor: 'Birgunj Traders Co.', date: '17 July 2026', units: '1,500 Units', value: 'NPR 5,80,000.00', status: 'Fully Invoiced', statusClass: 'on-time', icon: 'fa-circle-check' },
        { ref: 'SO-9931', distributor: 'Pokhara Valley Distributors', date: '17 July 2026', units: '2,100 Units', value: 'NPR 8,20,000.00', status: 'Awaiting Dispatch', statusClass: 'in-transit', icon: 'fa-spinner' }
      ],
      revenue: {
        grossToday: 'NPR 32,80,000.00',
        targetAttainment: 'NPR 2,10,0,000.00'
      },
      kpis: {
        sla: '88.5%',
        delay: '34.8 Mins',
        satIndex: '4.22 / 5.00'
      },
      mapCenter: [27.4, 84.3],
      mapZoom: 8
    }
  }
};
window.OdooSalesTemplates = {\n  'live_tracking': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Fleet</a> › 
  <a href="#" onclick="loadComponent('live_tracking')">Sales Dashboard</a> › 
  <span>Bagmati Province</span>
</div>
<div class="o-page-title">
  My Territory — Live View
  <span class="scope-pill"><i class="fa-solid fa-lock"></i> Scoped: Bagmati Region Only</span>
</div>


<!-- KPI ROW -->
<div class="kpi-row">
  <div class="kpi-card">
    <div class="kpi-icon teal"><i class="fa-solid fa-box-open"></i></div>
    <div>
      <div class="kpi-val" id="kpi-del-val">0</div>
      <div class="kpi-label">Deliveries – My Territory Today</div>
      <div class="kpi-sub" id="kpi-del-sub"><i class="fa-solid fa-location-dot"></i> --</div>
    </div>
  </div>
  <div class="kpi-card">
    <div class="kpi-icon danger"><i class="fa-solid fa-clock"></i></div>
    <div>
      <div class="kpi-val" id="kpi-delay-val" style="color:var(--red)">0</div>
      <div class="kpi-label">Delayed Orders</div>
      <div class="kpi-sub red" id="kpi-delay-sub">--</div>
    </div>
  </div>
  <div class="kpi-card">
    <div class="kpi-icon purple"><i class="fa-solid fa-scale-balanced"></i></div>
    <div>
      <div class="kpi-val" id="kpi-vol-val" style="font-size:16px;">0 <span style="font-size:13px; font-weight:400; color:var(--text-muted)">kg</span></div>
      <div class="kpi-label">Total Volume/Value in Transit</div>
      <div class="kpi-sub" id="kpi-vol-sub">--</div>
    </div>
  </div>
  <div class="kpi-card">
    <div class="kpi-icon success"><i class="fa-solid fa-circle-check"></i></div>
    <div>
      <div class="kpi-val" id="kpi-ot-val" style="color:var(--teal)">0%</div>
      <div class="kpi-label">On-Time Rate – This Month</div>
      <div class="kpi-sub" id="kpi-ot-sub">--</div>
    </div>
  </div>
</div>

<div class="map-card">
  <div class="map-toolbar">
    <span class="scoped-badge"><i class="fa-solid fa-shield-halved"></i> Filtered View — Active Operations</span>
    <select id="station-navigator" onchange="window.navigateToStation(this.value)" style="margin-left: auto; padding: 4px 8px; border: 1px solid var(--border); border-radius: 4px; font-size: 11.5px; background: white; cursor: pointer; color: var(--text);">
      <option value="">🗺️ Navigate to Station...</option>
    </select>
  </div>
  <div class="map-area">
    <div id="map" style="width: 100%; height: 100%; z-index: 1;"></div>
    
    <div class="map-info-overlay">
      <div class="info-title">
        <span class="info-dot active" id="overlay-dot"></span>
        <span id="overlay-truck-id">Select a shipment marker</span>
      </div>
      <div class="info-details" id="overlay-body">
        <p id="overlay-route">Route Context</p>
        <p id="overlay-speed">Status Details</p>
        <p id="overlay-distributor">Click marker to view live status.</p>
      </div>
    </div>
    <div class="privacy-note"><i class="fa-solid fa-eye-slash"></i> No driver behavior data · ETA only</div>
  </div>
</div>`,\n  'my_deliveries': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Fleet</a> › 
  <a href="#" onclick="loadComponent('live_tracking')">Sales Dashboard</a> › 
  <span>My Deliveries</span>
</div>
<div class="o-page-title">
  Active Dispatches Ledger
</div>

<div class="list-card">
  <div class="list-toolbar">
    <div class="section-title" style="font-size: 12.5px;"><i class="fa-solid fa-receipt"></i> Territory Delivery Pipeline</div>
  </div>
  <table class="o-table">
    <thead>
      <tr>
        <th>Distributor Name</th>
        <th>Delivery Ref</th>
        <th>Route Context</th>
        <th>Expected Arrival</th>
        <th>Payload Volume</th>
        <th>Logistics Status</th>
        <th>System Action</th>
      </tr>
    </thead>
    <tbody id="deliveries-table-body">
    </tbody>
  </table>
</div>`,\n  'my_distributors': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Fleet</a> › 
  <a href="#" onclick="loadComponent('live_tracking')">Sales Dashboard</a> › 
  <span>My Distributors</span>
</div>
<div class="o-page-title" id="distributors-page-title">
  Distributor Ledger — Scoped
</div>

<div class="list-card">
  <div class="list-toolbar">
    <div class="section-title" style="font-size: 12.5px;"><i class="fa-solid fa-users-gear"></i> Account Overview</div>
  </div>
  <table class="o-table">
    <thead>
      <tr>
        <th>Distributor Name</th>
        <th>Primary Contact</th>
        <th>Phone Line</th>
        <th>Account Status</th>
        <th>Current Logistics Log</th>
      </tr>
    </thead>
    <tbody id="distributors-table-body">
    </tbody>
  </table>
</div>`,\n  'performance_kpis': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Sales</a> › <span>Performance KPIs</span>
</div>
<div class="o-page-title">
  Regional Logistics & SLA Auditing
</div>

<div class="list-card" style="padding: 20px;">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
    <div style="border: 1px solid var(--border); padding: 15px; border-radius: 5px; text-align: center;">
      <div style="font-size: 11px; font-weight: bold; color: var(--text-muted); text-transform: uppercase;">SLA Contract Compliance</div>
      <div style="font-size: 24px; font-weight: bold; color: var(--teal); margin-top: 5px;" id="kpi-sla-pct">0.0%</div>
    </div>
    <div style="border: 1px solid var(--border); padding: 15px; border-radius: 5px; text-align: center;">
      <div style="font-size: 11px; font-weight: bold; color: var(--text-muted); text-transform: uppercase;">Average Fulfillment Delays</div>
      <div style="font-size: 24px; font-weight: bold; color: var(--amber); margin-top: 5px;" id="kpi-avg-delay">0 Mins</div>
    </div>
    <div style="border: 1px solid var(--border); padding: 15px; border-radius: 5px; text-align: center;">
      <div style="font-size: 11px; font-weight: bold; color: var(--text-muted); text-transform: uppercase;">Customer Satisfaction Index</div>
      <div style="font-size: 24px; font-weight: bold; color: var(--purple); margin-top: 5px;" id="kpi-sat-index">0.00 / 5.00</div>
    </div>
  </div>
  
  <!-- Line chart for SLA compliant trend -->
  <div style="margin-top: 24px; border-top: 1px solid var(--border); padding-top: 20px;">
    <div style="font-size: 11px; font-weight: bold; color: var(--purple); text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
      <i class="fa-solid fa-chart-line"></i> SLA Fulfillment Compliance Trend (Last 7 Days)
    </div>
    <div style="width: 100%; height: 240px; position: relative;">
      <canvas id="slaTrendChart"></canvas>
    </div>
  </div>
</div>`,\n  'revenue_territory': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Sales</a> › <span>Revenue – Territory</span>
</div>
<div class="o-page-title">
  Territory Financial Appraisals
</div>

<div class="kpi-row">
  <div class="kpi-card" style="grid-column: span 2;">
    <div class="kpi-icon success"><i class="fa-solid fa-wallet"></i></div>
    <div>
      <div class="kpi-val" id="rev-gross-today">NPR 0.00</div>
      <div class="kpi-label" id="rev-gross-label">Gross Volume Dispatched (Today)</div>
    </div>
  </div>
  <div class="kpi-card" style="grid-column: span 2;">
    <div class="kpi-icon purple"><i class="fa-solid fa-chart-line"></i></div>
    <div>
      <div class="kpi-val" id="rev-target-attainment">NPR 0.00</div>
      <div class="kpi-label">Territory Monthly Target Attainment Achievement</div>
    </div>
  </div>
</div>`,\n  'sales_orders': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Sales</a> › <span>Sales Orders</span>
</div>
<div class="o-page-title">
  Sales Pipeline Processing & Revenue
</div>

<!-- Revenue KPI Row -->
<div class="kpi-row" style="margin-bottom: 20px;">
  <div class="kpi-card" style="grid-column: span 2;">
    <div class="kpi-icon success"><i class="fa-solid fa-wallet"></i></div>
    <div>
      <div class="kpi-val" id="rev-gross-today">NPR 0.00</div>
      <div class="kpi-label" id="rev-gross-label">Gross Volume Dispatched (Today)</div>
    </div>
  </div>
  <div class="kpi-card" style="grid-column: span 2;">
    <div class="kpi-icon purple"><i class="fa-solid fa-chart-line"></i></div>
    <div>
      <div class="kpi-val" id="rev-target-attainment">NPR 0.00</div>
      <div class="kpi-label">Territory Monthly Target Attainment Achievement</div>
    </div>
  </div>
</div>

<div class="list-card">
  <table class="o-table">
    <thead>
      <tr>
        <th>Document Reference</th>
        <th>Customer Account</th>
        <th>Creation Date</th>
        <th>Order Quantities</th>
        <th>Billing Subtotal</th>
        <th>ERP Process Stage</th>
      </tr>
    </thead>
    <tbody id="orders-table-body">
    </tbody>
  </table>
</div>`,\n  'sms_notifications': `<div class="o-breadcrumb">
  <a href="#" onclick="loadComponent('live_tracking')">Fleet</a> › 
  <a href="#" onclick="loadComponent('live_tracking')">Sales Dashboard</a> › 
  <span>Message Center</span>
</div>
<div class="o-page-title">
  Communication Logs & Message Dispatch
</div>

<div class="list-card" style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div class="sms-box" style="border: 1px solid var(--border); box-shadow: none; display: block; width: 100%;">
    <div class="sms-header" style="background: var(--purple-mid);"><i class="fa-solid fa-envelope-open-text"></i> Manual Message Dispatch</div>
    <div class="sms-body">
      <div class="sms-field">
        <label>Distributor Stream Selection</label>
        <select id="sms-target-selector" style="width: 100%; padding: 8px; border: 1px solid var(--border); border-radius: 5px;" onchange="window.updateSmsPreview(this.value)">
        </select>
      </div>
      <div class="sms-field" style="margin-top: 15px;">
        <label>Message Content Engine</label>
        <textarea id="sms-body-preview" style="width: 100%; height: 120px; padding: 10px; border: 1px solid var(--border); border-radius: 5px; font-family: sans-serif; resize: none;"></textarea>
      </div>
    </div>
    <div class="sms-footer" style="margin-top: 20px; border-top: none; padding: 0; background: transparent; display: flex; gap: 8px; justify-content: stretch;">
      <button class="btn-send" style="flex: 1; padding: 10px 6px; background: var(--purple-mid); font-size: 11px;" onclick="window.executeMessageBroadcast('Email')"><i class="fa-solid fa-envelope"></i> Send via Email</button>
      <button class="btn-send" style="flex: 1; padding: 10px 6px; background: var(--teal); font-size: 11px;" onclick="window.executeMessageBroadcast('SMS')"><i class="fa-solid fa-comment-sms"></i> Send via SMS</button>
      <button class="btn-send" style="flex: 1; padding: 10px 6px; background: #25D366; font-size: 11px;" onclick="window.executeMessageBroadcast('WhatsApp')"><i class="fa-brands fa-whatsapp"></i> Send via WhatsApp</button>
    </div>
  </div>
</div>`,\n};

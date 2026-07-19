import re

with open('dashboard_admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add buildSelectDriver and buildSelectVehicle before vehiclesHTML
helpers_code = """
    function buildSelectDriver(sel, onChange) {
      const drivers = ['Unassigned', 'Rajan Shrestha', 'Bikash Tamang', 'Suresh Rai', 'Deepak Gurung', 'Arjun Thapa', 'Ramesh Magar', 'Santosh Koirala'];
      return `<select onchange="${onChange}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;">${drivers.map(d => `<option value="${d}" ${sel===d?'selected':''}>${d}</option>`).join('')}</select>`;
    }
    
    function buildSelectVehicle(sel, onChange) {
      const vehicles = ['Unassigned', 'BA 2 KHA 1423', 'BA 1 CHA 7829', 'GA 3 PA 4412', 'KO 1 GA 3311', 'LU 2 MA 8821', 'BA 4 KA 2210', 'GA 1 NA 5520'];
      return `<select onchange="${onChange}" style="width:100%;padding:4px;border:1px solid var(--border);border-radius:4px;">${vehicles.map(v => `<option value="${v}" ${sel===v?'selected':''}>${v}</option>`).join('')}</select>`;
    }

    function initFleetState() {"""
content = content.replace('function initFleetState() {', helpers_code)

# 2. Add GPS Tracking Settings
gps_settings = """      <!-- GPS Tracking Settings -->
      <div class="card" style="padding:16px;">
        <div style="font-size:12px;font-weight:800;margin-bottom:12px;"><i class="fa-solid fa-satellite-dish text-primary"></i> GPS Tracking Settings</div>
        <div style="display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:10px;">
          <div class="form-group"><label class="form-label">TrackOnGPS Server URL</label><input class="form-input" type="text" value="https://api.trackongps.com/v1"></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">
          <div class="form-group"><label class="form-label">Username / Email</label><input class="form-input" type="text" value="unilever_np_api"></div>
          <div class="form-group"><label class="form-label">Password</label><input class="form-input" type="password" value="********"></div>
          <div class="form-group"><label class="form-label">Auto-Sync Interval in minutes</label><input class="form-input" type="text" value="5"></div>
          <div class="form-group"><label class="form-label">Map Refresh Interval in seconds</label><input class="form-input" type="text" value="30"></div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn btn-primary" onclick="showToast('Saved','GPS Tracking settings updated.')">💾 Save GPS Settings</button>
          <button class="btn btn-teal" onclick="showToast('Connection OK','GPS server connection test successful.')">🔗 Test Connection</button>
        </div>
      </div>
      <!-- SMS -->"""
content = content.replace('<!-- SMS -->', gps_settings)

with open('dashboard_admin.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch applied")

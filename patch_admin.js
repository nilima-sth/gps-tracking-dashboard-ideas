const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dashboard_admin.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. CSS for Depot Weather
const cssToInsert = `    .weather-row-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 16px;
      border-bottom: 1px solid var(--border);
      font-size: 12px;
      transition: background 0.15s;
    }
    .weather-row-item:hover {
      background: var(--bg);
    }
    .weather-row-item:last-child {
      border-bottom: none;
    }
    .weather-city {
      font-weight: 600;
      color: var(--text);
    }
    .weather-details {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'DM Mono', monospace;
      font-weight: 700;
    }
    .weather-details i {
      font-size: 14px;
    }

    @media print {`;
content = content.replace('    @media print {', cssToInsert);

// 2. Remove vehiclerequest from topbar
const topbarToReplace = `      <div class="top-menu-item" id="top-vehicles" onclick="switchPage('vehicles')"><i class="fa-solid fa-car"></i>
        Vehicles</div>
      <div class="top-menu-item" id="top-vehiclerequest" onclick="switchPage('vehiclerequest')"><i
          class="fa-solid fa-hand-holding-hand"></i> Vehicle Request</div>`;
const topbarReplacement = `      <div class="top-menu-item" id="top-vehicles" onclick="switchPage('vehicles')"><i class="fa-solid fa-car"></i>
        Vehicles & Requests</div>`;
content = content.replace(topbarToReplace, topbarReplacement);

// 3. switchPage logic
const switchPageToReplace = `function switchPage(id) {
      S.page = id;`;
const switchPageReplacement = `function switchPage(id) {
      if (id === 'vehiclerequest') id = 'vehicles';
      S.page = id;`;
content = content.replace(switchPageToReplace, switchPageReplacement);

// 4. router mapping
const routerMapToReplace = `vehicles: vehiclesHTML, vehiclerequest: vehiclerequestHTML, contracts: contractsHTML`;
const routerMapReplacement = `vehicles: vehiclesHTML, vehiclerequest: vehiclesHTML, contracts: contractsHTML`;
content = content.replace(routerMapToReplace, routerMapReplacement);

// 5. vehiclesHTML combined logic
const combinedVehiclesHTML = `function vehiclesHTML() {
      const st = initFleetState();
      
      // Initialize default request states on trucks if they don't exist
      S.trucks.forEach((t, idx) => {
        if (!t.vReqState) {
          if (idx === 0) t.vReqState = 'Delivered';
          else if (idx === 1) t.vReqState = 'Registered';
          else if (idx === 2) t.vReqState = 'To Order';
          else if (idx === 3) t.vReqState = 'New Request';
          else t.vReqState = 'Delivered';
        }
      });

      // If no selected vehicle, select the first one by default
      if (!S.fleet.selectedReg && S.trucks.length > 0) {
        const first = S.trucks[0];
        S.fleet.selectedReg = first.reg;
        S.fleet.vModel = first.model;
        S.fleet.vPlate = first.reg;
        S.fleet.vDriver = first.driver;
        S.fleet.vReqState = first.vReqState;
      }

      const activeTruck = S.trucks.find(t => t.reg === S.fleet.selectedReg);

      const statusBtn = (status) => {
        const currentStatus = activeTruck ? activeTruck.vReqState : st.vReqState;
        return currentStatus === status
          ? 'background:var(--teal);color:#fff;border-radius:4px;padding:4px 10px;font-weight:700;box-shadow:0 1px 2px rgba(0,0,0,.1);'
          : 'padding:4px 10px;color:var(--text-muted);cursor:pointer;';
      };

      // Function to handle switching selected vehicle
      window.selectVehicle = function(reg) {
        const t = S.trucks.find(truck => truck.reg === reg);
        if (t) {
          S.fleet.selectedReg = reg;
          S.fleet.vModel = t.model;
          S.fleet.vPlate = t.reg;
          S.fleet.vDriver = t.driver;
          S.fleet.vReqState = t.vReqState;
          S.fleet.vTags = t.vTags || '';
          S.fleet.vMobility = t.vMobility || '';
          S.fleet.vFutureDriver = t.vFutureDriver || '';
          S.fleet.vAssignDate = t.vAssignDate || '';
          S.fleet.vCategory = t.vCategory || '';
          S.fleet.vOrderDate = t.vOrderDate || '';
          S.fleet.vChassis = t.vChassis || '';
          S.fleet.vGpsDevice = t.vGpsDevice || '';
          S.fleet.vGpsStatus = t.vGpsStatus || '';
          S.fleet.vGpsPos = t.vGpsPos || '';
          S.fleet.vGpsSync = t.vGpsSync || '';
          S.fleet.vGpsAddr = t.vGpsAddr || '';
          S.fleet.vManager = t.vManager || '';
        } else {
          S.fleet.selectedReg = 'NEW';
          S.fleet.vModel = '';
          S.fleet.vPlate = '';
          S.fleet.vDriver = '';
          S.fleet.vReqState = 'New Request';
          S.fleet.vTags = '';
          S.fleet.vMobility = '';
          S.fleet.vFutureDriver = '';
          S.fleet.vAssignDate = '';
          S.fleet.vCategory = '';
          S.fleet.vOrderDate = '';
          S.fleet.vChassis = '';
          S.fleet.vGpsDevice = '';
          S.fleet.vGpsStatus = '';
          S.fleet.vGpsPos = '';
          S.fleet.vGpsSync = '';
          S.fleet.vGpsAddr = '';
          S.fleet.vManager = '';
        }
        render();
      };

      // Action updates
      window.updateRequestState = function(state, toastMsg) {
        if (activeTruck) {
          activeTruck.vReqState = state;
          S.fleet.vReqState = state;
          showToast('Status Update', toastMsg);
        } else {
          S.fleet.vReqState = state;
          showToast('Status Update', 'New Vehicle Request state: ' + state);
        }
        render();
      };

      window.saveVehicleForm = function() {
        if (S.fleet.selectedReg === 'NEW') {
          if (!S.fleet.vPlate) {
            alert('Please enter a License Plate');
            return;
          }
          const newTruck = {
            id: 'TR-' + String(S.trucks.length + 1).padStart(3, '0'),
            reg: S.fleet.vPlate,
            model: S.fleet.vModel || 'Unknown Model',
            driver: S.fleet.vDriver || 'Unassigned',
            status: 'On Schedule',
            sc: 'green',
            fuel: 100,
            vReqState: S.fleet.vReqState || 'New Request',
            vTags: S.fleet.vTags,
            vMobility: S.fleet.vMobility,
            vFutureDriver: S.fleet.vFutureDriver,
            vAssignDate: S.fleet.vAssignDate,
            vCategory: S.fleet.vCategory,
            vOrderDate: S.fleet.vOrderDate,
            vChassis: S.fleet.vChassis,
            vGpsDevice: S.fleet.vGpsDevice,
            vGpsStatus: S.fleet.vGpsStatus,
            vGpsPos: S.fleet.vGpsPos,
            vGpsSync: S.fleet.vGpsSync,
            vGpsAddr: S.fleet.vGpsAddr,
            vManager: S.fleet.vManager
          };
          S.trucks.push(newTruck);
          S.fleet.selectedReg = newTruck.reg;
          showToast('Created', 'New vehicle request added successfully');
        } else if (activeTruck) {
          activeTruck.model = S.fleet.vModel;
          activeTruck.reg = S.fleet.vPlate;
          activeTruck.driver = S.fleet.vDriver;
          activeTruck.vReqState = S.fleet.vReqState;
          activeTruck.vTags = S.fleet.vTags;
          activeTruck.vMobility = S.fleet.vMobility;
          activeTruck.vFutureDriver = S.fleet.vFutureDriver;
          activeTruck.vAssignDate = S.fleet.vAssignDate;
          activeTruck.vCategory = S.fleet.vCategory;
          activeTruck.vOrderDate = S.fleet.vOrderDate;
          activeTruck.vChassis = S.fleet.vChassis;
          activeTruck.vGpsDevice = S.fleet.vGpsDevice;
          activeTruck.vGpsStatus = S.fleet.vGpsStatus;
          activeTruck.vGpsPos = S.fleet.vGpsPos;
          activeTruck.vGpsSync = S.fleet.vGpsSync;
          activeTruck.vGpsAddr = S.fleet.vGpsAddr;
          activeTruck.vManager = S.fleet.vManager;
          S.fleet.selectedReg = S.fleet.vPlate;
          showToast('Saved', 'Vehicle details updated successfully');
        }
        render();
      };

      const leftItemsHtml = S.trucks.map(t => {
        const isSelected = S.fleet.selectedReg === t.reg;
        const activeBg = isSelected ? 'background:var(--purple-light); border-left:4px solid var(--purple);' : 'border-left:4px solid transparent;';
        
        let stateBadgeColor = 'background:#f1f5f9; color:#475569;';
        if (t.vReqState === 'Delivered') stateBadgeColor = 'background:#dcfce7; color:#15803d;';
        else if (t.vReqState === 'Registered') stateBadgeColor = 'background:#dbeafe; color:#1d4ed8;';
        else if (t.vReqState === 'To Order') stateBadgeColor = 'background:#fef3c7; color:#b45309;';
        else if (t.vReqState === 'New Request') stateBadgeColor = 'background:#f3e8ff; color:#6b21a8;';

        let runStatusBadge = \`<span class="badge badge-green">\${t.status}</span>\`;
        if (t.sc === 'red') runStatusBadge = \`<span class="badge badge-red">\${t.status}</span>\`;
        else if (t.sc === 'amber') runStatusBadge = \`<span class="badge badge-amber">\${t.status}</span>\`;

        return \`
        <div style="padding:12px 16px; border-bottom:1px solid var(--border); cursor:pointer; \${activeBg} transition:all 0.15s;" onclick="selectVehicle('\${t.reg}')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong style="font-size:13px; color:var(--text);">\${t.reg}</strong>
            <span style="font-size:9.5px; font-weight:700; padding:2px 6px; border-radius:10px; margin-left:auto; \${stateBadgeColor}">\${t.vReqState || 'New Request'}</span>
          </div>
          <div style="font-size:11px; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center;">
            <span>\${t.model}</span>
            \${runStatusBadge}
          </div>
        </div>\`;
      }).join('');

      return \`<div>
    <div class="page-header">
      <div>
        <div class="page-title" style="display:flex;align-items:center;gap:10px;">
          <span style="color:var(--teal);">Vehicles & Requests Portal</span>
          <span style="color:var(--text-muted);font-weight:400;font-size:14px;">// Unified Management</span>
        </div>
      </div>
      <div style="display:flex;gap:12px;">
        <button class="btn btn-outline" onclick="showToast('History','Viewing Driver History')"><i class="fa-solid fa-clock-rotate-left"></i> Drivers History</button>
        <button class="btn btn-outline" onclick="switchPage('contracts')"><i class="fa-solid fa-file-contract"></i> Contracts</button>
        <button class="btn btn-outline" onclick="showToast('Services','Viewing Services')"><i class="fa-solid fa-wrench"></i> Services</button>
      </div>
    </div>

    <div style="display:flex; min-height:calc(100vh - 120px);">
      <!-- Left sidebar: Vehicle List -->
      <div style="width:300px; border-right:1px solid var(--border); background:var(--white); display:flex; flex-direction:column; flex-shrink:0;">
        <div style="padding:12px 16px; border-bottom:1px solid var(--border); display:flex; gap:8px;">
          <button class="btn btn-teal btn-sm" style="flex:1; justify-content:center;" onclick="selectVehicle('NEW')"><i class="fa-solid fa-plus"></i> Request New Vehicle</button>
        </div>
        <div style="flex:1; overflow-y:auto; max-height: calc(100vh - 180px);">
          \${leftItemsHtml}
        </div>
      </div>

      <!-- Right panel: Vehicle Details & Request Form -->
      <div style="flex:1; overflow-y:auto; background:var(--bg); padding:20px;">
        <div style="background:var(--white); border:1px solid var(--border); border-radius:8px; padding:20px; max-width:850px; margin:0 auto; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
          <!-- Header buttons -->
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding-bottom:15px; margin-bottom:20px; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; gap:8px;">
              <button class="btn btn-primary" onclick="updateRequestState('To Order', 'Vehicle Request Sent')">Request Vehicle</button>
              <button class="btn btn-outline" onclick="updateRequestState('Registered', 'Vehicle Assigned')">Assign Vehicle</button>
              <button class="btn btn-outline" onclick="showToast('Ready','Marked as Ready');">Ready for Delivery</button>
              <button class="btn btn-outline" onclick="updateRequestState('Delivered', 'Vehicle Delivered')">Delivered</button>
            </div>
            
            <div style="display:flex; gap:4px; font-size:11.5px; align-items:center; background:var(--bg); padding:3px; border-radius:6px; border:1px solid var(--border);">
              <div style="\${statusBtn('Delivered')}" onclick="updateRequestState('Delivered', 'Status: Delivered')">Delivered</div>
              <div style="\${statusBtn('New Request')}" onclick="updateRequestState('New Request', 'Status: New Request')">New Request</div>
              <div style="\${statusBtn('To Order')}" onclick="updateRequestState('To Order', 'Status: To Order')">To Order</div>
              <div style="\${statusBtn('Registered')}" onclick="updateRequestState('Registered', 'Status: Registered')">Registered</div>
            </div>
          </div>

          <!-- Main form fields -->
          <div style="display:flex; justify-content:space-between; margin-bottom:24px;">
            <div style="flex:1;">
              <div class="form-group">
                <label class="form-label">Model Name</label>
                <input class="form-input" style="font-size:20px; font-weight:700; padding:8px 12px; border-color:var(--teal);" placeholder="e.g. Tata LPT 2518" value="\${st.vModel || ''}" onchange="S.fleet.vModel=this.value; render();">
              </div>
              <div class="form-group" style="margin-top:15px;">
                <label class="form-label">License Plate</label>
                <input class="form-input" style="font-size:16px;" placeholder="e.g. BA 2 KHA 9999" value="\${st.vPlate || ''}" onchange="S.fleet.vPlate=this.value; render();">
              </div>
              <div class="form-group" style="margin-top:15px;">
                <label class="form-label">Tags / Categories</label>
                <input class="form-input" placeholder="e.g. heavy-duty, long-haul" value="\${st.vTags || ''}" onchange="S.fleet.vTags=this.value; render();">
              </div>
            </div>
            <div style="width:120px; height:120px; background:var(--bg); border:1px dashed var(--border); display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:36px; border-radius:8px; margin-left:40px; cursor:pointer;" onclick="showToast('Upload','Image upload dialog opened')">
              <i class="fa-solid fa-camera"></i>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px;">
            <div>
              <div style="font-weight:800; font-size:11px; color:var(--text); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:15px; letter-spacing:1px;">DRIVER CONFIGURATION</div>
              <div class="stat-row"><span class="stat-label">Driver Assigned</span><span class="stat-val">\${buildSelectDriver(st.vDriver, 'S.fleet.vDriver=this.value; render();')}</span></div>
              <div class="stat-row"><span class="stat-label">Mobility Card</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vMobility || ''}" onchange="S.fleet.vMobility=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">Future Driver</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vFutureDriver || ''}" onchange="S.fleet.vFutureDriver=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">Assignment Date</span><span class="stat-val"><input class="form-input" type="date" style="padding:4px 8px; width:150px;" value="\${st.vAssignDate || ''}" onchange="S.fleet.vAssignDate=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">Company Owned</span><span class="stat-val">Unilever Nepal Ltd.</span></div>
            </div>
            <div>
              <div style="font-weight:800; font-size:11px; color:var(--text); border-bottom:1px solid var(--border); padding-bottom:5px; margin-bottom:15px; letter-spacing:1px;">VEHICLE STATUS & TELEMATICS</div>
              <div class="stat-row"><span class="stat-label">Category</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vCategory || ''}" onchange="S.fleet.vCategory=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">Order Date</span><span class="stat-val"><input class="form-input" type="date" style="padding:4px 8px; width:150px;" value="\${st.vOrderDate || ''}" onchange="S.fleet.vOrderDate=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">Chassis Number</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vChassis || ''}" onchange="S.fleet.vChassis=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">GPS Device ID</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vGpsDevice || ''}" onchange="S.fleet.vGpsDevice=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">GPS Online Status</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vGpsStatus || ''}" onchange="S.fleet.vGpsStatus=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">GPS Last Position</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vGpsPos || ''}" onchange="S.fleet.vGpsPos=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">GPS Last Sync</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vGpsSync || ''}" onchange="S.fleet.vGpsSync=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label">GPS Speed</span><span class="stat-val">\${activeTruck ? activeTruck.speed + ' km/h' : '0.00'}</span></div>
              <div class="stat-row"><span class="stat-label">GPS Address</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vGpsAddr || ''}" onchange="S.fleet.vGpsAddr=this.value; render();"></span></div>
              <div class="stat-row"><span class="stat-label" style="font-weight:700; color:var(--text);">Vehicle Availability</span><span class="stat-val badge badge-green">Available</span></div>
              <div class="stat-row"><span class="stat-label">Last Revenue Amount</span><span class="stat-val">\${activeTruck ? activeTruck.fuel + ' NPR' : '0.00 Rs'}</span></div>
              <div class="stat-row"><span class="stat-label">Currency</span><span class="stat-val" style="color:var(--teal);">NPR</span></div>
              <div class="stat-row"><span class="stat-label">Fleet Manager</span><span class="stat-val"><input class="form-input" style="padding:4px 8px; width:150px;" value="\${st.vManager || ''}" onchange="S.fleet.vManager=this.value; render();"></span></div>
            </div>
          </div>

          <div style="margin-top:30px; border-top:1px solid var(--border); padding-top:15px; display:flex; justify-content:flex-end;">
            <button class="btn btn-teal" onclick="saveVehicleForm()"><i class="fa-solid fa-save"></i> Save Vehicle</button>
          </div>
        </div>
      </div>
    </div>
  </div>\`;
    }`;

// Replace the two old functions with this combined one
const startIndex = content.indexOf('function vehiclesHTML() {');
const endIndex = content.indexOf('function contractsHTML() {');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + combinedVehiclesHTML + '\\n\\n    ' + content.substring(endIndex);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Patch applied successfully.');

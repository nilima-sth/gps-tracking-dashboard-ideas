const fs = require('fs');

let content = fs.readFileSync('dashboard_admin.html', 'utf8');

const functionsToInject = `
    function initFleetState() {
      if (!S.fleet) {
        S.fleet = {
          vReqState: 'New Request',
          vModel: '', vPlate: '', vTags: '',
          vDriver: '',
          vMobility: '', vFutureDriver: '', vAssignDate: '',
          vCategory: '', vOrderDate: '', vChassis: '', vGpsDevice: '', vGpsStatus: '', vGpsPos: '', vGpsSync: '', vGpsAddr: '', vManager: '',
          cState: 'New', cType: 'Leasing', cRef: '', cVendor: '', cKM: false, cServices: '', cDate: '',
          cVehicle: '', cDriver: '',
          rState: 'Draft', rTab: 'Distance',
          rOdoStart: '0.00', rOdoEnd: '0.00', rFuelQty: '0.00', rEmp: '',
          rVehicle: '', rDriver: '',
          gps: [
            { id: 'gps1', name: 'Samjana', status: 'Offline', ignition: false, sel: false, route: '' },
            { id: 'gps2', name: 'moto', status: 'Offline', ignition: true, sel: false, route: 'Suzate Pension & Restaurant, Machhindra Marg, Lalitpur-20...' },
            { id: 'gps3', name: 'moto2', status: 'Offline', ignition: false, sel: false, route: '' }
          ],
          selectedReg: ''
        };
      }
      return S.fleet;
    }

    function buildSelectDriver(selectedVal, onChangeExpr) {
      const driverOptions = S.trucks.map(t => \`<option value="\${t.driver}" \${selectedVal === t.driver ? 'selected' : ''}>\${t.driver}</option>\`).join('');
      return \`<select class="form-input" style="padding:4px 8px;width:150px;" onchange="\${onChangeExpr}">
    <option value="">Select Driver...</option>
    \${driverOptions}
  </select>\`;
    }

    function buildSelectVehicle(selectedVal, onChangeExpr) {
      const vehicleOptions = S.trucks.map(t => \`<option value="\${t.reg}" \${selectedVal === t.reg ? 'selected' : ''}>\${t.reg} (\${t.model})</option>\`).join('');
      return \`<select class="form-input" style="padding:4px 8px;width:150px;" onchange="\${onChangeExpr}">
    <option value="">Select Vehicle...</option>
    \${vehicleOptions}
  </select>\`;
    }
`;

if (!content.includes('function initFleetState()')) {
  content = content.replace('function contractsHTML() {', functionsToInject + '\n    function contractsHTML() {');
  fs.writeFileSync('dashboard_admin.html', content);
  console.log('Injected missing functions');
} else {
  console.log('Already exists');
}

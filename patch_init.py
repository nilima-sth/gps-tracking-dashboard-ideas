import re

with open('dashboard_admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_init = """    function initFleetState() {
      if(!S.cState) S.cState = 'active';
      if(!S.rState) S.rState = 'pending';
      if(!S.vState) S.vState = 'all';
      if(!S.gps) S.gps = [];
      return S;
    }"""

new_init = """    function initFleetState() {
      if(!S.fleet) {
        S.fleet = {
          cState: 'active',
          rState: 'pending',
          vState: 'all',
          gps: [
            { id: '1', gpsId: 'GPS-882142', name: 'BA 2 KHA 1423', status: 'Offline', sel: false, ignition: false },
            { id: '2', gpsId: 'GPS-782910', name: 'BA 1 CHA 7829', status: 'Offline', sel: false, ignition: false }
          ]
        };
      }
      return S.fleet;
    }"""

content = content.replace(old_init, new_init)

with open('dashboard_admin.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch applied for initFleetState")

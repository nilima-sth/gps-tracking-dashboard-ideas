import re

with open('dashboard_admin.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update dispatchHTML
old_dispatch = """    function dispatchHTML() {
      const filtered = S.q
        ? S.trucks.filter(t => t.reg.toLowerCase().includes(S.q) || t.driver.toLowerCase().includes(S.q) || t.order.toLowerCase().includes(S.q))
        : S.trucks;"""
new_dispatch = """    function dispatchHTML() {
      let filtered = S.trucks;
      
      if (S.kpiFilter) {
        filtered = filtered.filter(t => t.sc === S.kpiFilter);
      }
      
      if (S.q) {
        filtered = filtered.filter(t => t.reg.toLowerCase().includes(S.q) || t.driver.toLowerCase().includes(S.q) || t.order.toLowerCase().includes(S.q));
      }"""
content = content.replace(old_dispatch, new_dispatch)

# 2. Update KPI Cards
old_card1 = '<div class="kpi-card"><div class="kpi-icon teal">🚛</div>'
new_card1 = '<div class="kpi-card" onclick="S.kpiFilter=\'green\'; switchPage(\'dispatch\')" style="cursor: pointer;"><div class="kpi-icon teal">🚛</div>'
content = content.replace(old_card1, new_card1)

old_card2 = '<div class="kpi-card"><div class="kpi-icon red">⏰</div>'
new_card2 = '<div class="kpi-card" onclick="S.kpiFilter=\'red\'; switchPage(\'dispatch\')" style="cursor: pointer;"><div class="kpi-icon red">⏰</div>'
content = content.replace(old_card2, new_card2)

old_card3 = '<div class="kpi-card"><div class="kpi-icon amber">🔔</div>'
new_card3 = '<div class="kpi-card" onclick="S.kpiFilter=\'amber\'; switchPage(\'dispatch\')" style="cursor: pointer;"><div class="kpi-icon amber">🔔</div>'
content = content.replace(old_card3, new_card3)

# 3. Update Sidebars to clear filter
old_nav_dispatch = '<div class="nav-item" id="nav-dispatch" onclick="switchPage(\'dispatch\')">'
new_nav_dispatch = '<div class="nav-item" id="nav-dispatch" onclick="S.kpiFilter=null; switchPage(\'dispatch\')">'
content = content.replace(old_nav_dispatch, new_nav_dispatch)

old_nav_dashboard = '<div class="nav-item active" id="nav-dashboard" onclick="switchPage(\'dashboard\')">'
new_nav_dashboard = '<div class="nav-item active" id="nav-dashboard" onclick="S.kpiFilter=null; switchPage(\'dashboard\')">'
content = content.replace(old_nav_dashboard, new_nav_dashboard)

with open('dashboard_admin.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch complete")

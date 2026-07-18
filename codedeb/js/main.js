/**
 * CodeDeb Vehicle/Fleet Management System - Shared Interface & Drawer Controller
 */

document.addEventListener("DOMContentLoaded", () => {
    const db = getDatabase();
    injectHeader(db);
    injectSidebar();
    injectDrawerHTML();
    highlightActivePage();
});

function injectHeader(db) {
    const headerEl = document.getElementById("header-target");
    if (!headerEl) return;

    headerEl.innerHTML = `
        <div class="flex items-center space-x-3">
            <img src="https://i.imgur.com/lw1gRcQ.jpeg" alt="CodeDeb Logo" class="h-9 w-9 rounded object-cover border border-slate-700">
            <div>
                <span class="font-black text-white text-sm tracking-tight block">CodeDeb</span>
                <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Vehicle/Fleet Management System</span>
            </div>
        </div>
        <div class="flex items-center space-x-4">
            <div class="text-right">
                <div class="text-xs font-bold text-white">${db.manager}</div>
                <div class="text-[9px] text-slate-400 font-bold uppercase">${db.role}</div>
            </div>
            <div class="w-8 h-8 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">HM</div>
        </div>
    `;
}

function injectSidebar() {
    const sidebarEl = document.getElementById("sidebar-target");
    if (!sidebarEl) return;

    sidebarEl.innerHTML = `
        <div class="p-3 flex-1 overflow-y-auto space-y-4">
            <div>
                <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1">Operations</div>
                <nav class="space-y-0.5">
                    <a href="dashboard.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-dashboard">Overview Console</a>
                    <a href="departures.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-departures">Departure Board</a>
                    <a href="vehicles.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-vehicles">Live Tracking Map</a>
                </nav>
            </div>
            <div>
                <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1">Personnel Registers</div>
                <nav class="space-y-0.5">
                    <a href="drivers.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-drivers">Drivers Directory</a>
                    <a href="conductors.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-conductors">Conductors Registry</a>
                    <a href="owners.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-owners">Fleet Owners Index</a>
                </nav>
            </div>
            <div>
                <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1">Accounting Logs</div>
                <nav class="space-y-0.5">
                    <a href="finances.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-finances">Financial Ledgers</a>
                    <a href="reports.html" class="flex items-center space-x-2 px-2.5 py-1.5 text-xs text-slate-600 rounded hover:bg-slate-50 transition" id="nav-reports">System Analytics</a>
                </nav>
            </div>
        </div>
    `;
}

function injectDrawerHTML() {
    if (document.getElementById("drawer-overlay")) return;
    const drawer = document.createElement("div");
    drawer.innerHTML = `
        <div id="drawer-overlay" onclick="closeInspectorDrawer()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-200"></div>
        <div id="drawer-container" class="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-200 border-l border-slate-200 flex flex-col">
            <div class="p-3 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
                <h3 id="drawer-title" class="text-xs font-bold text-slate-900 uppercase tracking-wide">Details Profile</h3>
                <button onclick="closeInspectorDrawer()" class="text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-0.5 bg-slate-200/60 rounded">✕ Close</button>
            </div>
            <div id="drawer-content" class="p-4 flex-1 overflow-y-auto space-y-4 text-xs"></div>
        </div>
    `;
    document.body.appendChild(drawer);
}

function openInspectorDrawer(htmlContent, title = "System Profile View") {
    document.getElementById("drawer-title").innerText = title;
    document.getElementById("drawer-content").innerHTML = htmlContent;
    
    const overlay = document.getElementById("drawer-overlay");
    const container = document.getElementById("drawer-container");
    
    overlay.classList.remove("hidden");
    setTimeout(() => {
        overlay.classList.add("opacity-100");
        container.classList.remove("translate-x-full");
    }, 10);
}

function closeInspectorDrawer() {
    const overlay = document.getElementById("drawer-overlay");
    const container = document.getElementById("drawer-container");
    
    overlay.classList.remove("opacity-100");
    container.classList.add("translate-x-full");
    setTimeout(() => overlay.classList.add("hidden"), 200);
}

function showVehicleDrawer(vehicleId) {
    const db = getDatabase();
    const v = db.vehicles.find(veh => veh.id === vehicleId);
    if (!v) return;

    const booked = v.seats.filter(s => s.status === "occupied").length;
    
    const html = `
        <div class="space-y-3">
            <div class="p-2.5 bg-slate-50 border border-slate-200 rounded">
                <div class="text-[10px] text-slate-400 font-bold uppercase">Registration Number</div>
                <div class="text-sm font-black text-slate-900">${v.regNo}</div>
                <div class="text-[10px] text-slate-500 font-mono-data mt-0.5">${v.model} (${v.chargeLimit} Limit)</div>
            </div>
            <div class="space-y-1.5">
                <h4 class="font-bold text-slate-900 border-b border-slate-100 pb-1">Trip Timeline Progress</h4>
                <div class="grid grid-cols-2 gap-2">
                    <div><span class="text-slate-400 block text-[10px]">Departure Time</span><strong>${v.departureTime}</strong></div>
                    <div><span class="text-slate-400 block text-[10px]">Current Location</span><strong>${v.currentLocation}</strong></div>
                    <div><span class="text-slate-400 block text-[10px]">Next Planned Stop</span><strong>${v.nextStop}</strong></div>
                    <div><span class="text-slate-400 block text-[10px]">Status Badge</span><span class="text-blue-700 font-bold">[ ${v.status} ]</span></div>
                </div>
            </div>
            <div class="space-y-1.5 pt-2">
                <h4 class="font-bold text-slate-900 border-b border-slate-100 pb-1">Assigned Operational Staff</h4>
                <div><span class="text-slate-400">Driver:</span> <span class="font-bold hover:underline cursor-pointer text-blue-600" onclick="showDriverDrawer('${v.driver}')">${v.driver}</span></div>
                <div><span class="text-slate-400">Conductor:</span> <span class="font-bold">${v.conductor}</span></div>
                <div><span class="text-slate-400">Vehicle Owner:</span> <span class="font-bold">${v.owner}</span></div>
            </div>
            <div class="space-y-1.5 pt-2">
                <h4 class="font-bold text-slate-900 border-b border-slate-100 pb-1">Occupancy Load Summary</h4>
                <div class="text-slate-700 font-bold font-mono-data">${booked} / ${v.capacity} Seats Filled (${Math.round((booked/v.capacity)*100)}% Capacity)</div>
            </div>
        </div>
    `;
    openInspectorDrawer(html, `EV Profile: ${v.id}`);
}

function showDriverDrawer(driverName) {
    const db = getDatabase();
    const v = db.vehicles.find(veh => veh.driver === driverName);
    if (!v) return;

    const html = `
        <div class="space-y-3">
            <div class="flex items-center space-x-3 border-b border-slate-100 pb-3">
                <div class="w-10 h-10 rounded bg-slate-100 border border-slate-200 font-black text-slate-800 flex items-center justify-center text-sm">${v.driver.charAt(0)}</div>
                <div>
                    <h4 class="text-sm font-bold text-slate-900">${v.driver}</h4>
                    <span class="text-[10px] text-slate-400 font-mono-data block">Driver Registry Profile</span>
                </div>
            </div>
            <div class="space-y-2">
                <div><span class="text-slate-400 block text-[10px]">Mobile Phone Number</span><strong class="font-mono-data">${v.driverPhone}</strong></div>
                <div><span class="text-slate-400 block text-[10px]">Nepal Driving License Key</span><strong class="font-mono-data">${v.driverLicense}</strong></div>
                <div><span class="text-slate-400 block text-[10px]">Currently Assigned Vehicle</span><strong class="text-blue-600 cursor-pointer hover:underline" onclick="showVehicleDrawer('${v.id}')">${v.regNo} (${v.id})</strong></div>
                <div><span class="text-slate-400 block text-[10px]">Active Route Coverage</span><strong>Tamghas ⇄ Kathmandu</strong></div>
            </div>
            <div class="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded font-semibold text-center text-[10px] tracking-wide uppercase">
                Daily Roster Compliance Check: Approved OK
            </div>
        </div>
    `;
    openInspectorDrawer(html, "Driver Profile Record");
}

function highlightActivePage() {
    const pathname = window.location.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1) || "dashboard.html";
    
    let activeId = "nav-dashboard";
    if (filename.includes("departures")) activeId = "nav-departures";
    if (filename.includes("vehicles")) activeId = "nav-vehicles";
    if (filename.includes("drivers")) activeId = "nav-drivers";
    if (filename.includes("conductors")) activeId = "nav-conductors";
    if (filename.includes("owners")) activeId = "nav-owners";
    if (filename.includes("finances")) activeId = "nav-finances";
    if (filename.includes("reports")) activeId = "nav-reports";

    const activeEl = document.getElementById(activeId);
    if (activeEl) {
        activeEl.classList.add("bg-slate-100", "text-blue-700", "font-bold", "border-l-2", "border-blue-700");
        activeEl.classList.remove("text-slate-600");
    }
}
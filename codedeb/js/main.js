/**
 * CodeDeb Vehicle/Fleet Management System - Unified Header & Sidebar UI Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    const db = getDatabase();
    injectHeader(db);
    injectSidebar();
    highlightActivePage();
    startClock();
});

function injectHeader(db) {
    const headerEl = document.getElementById("header-target");
    if (!headerEl) return;

    headerEl.innerHTML = `
        <div class="flex items-center space-x-3">
            <img src="https://i.imgur.com/lw1gRcQ.jpeg" alt="CodeDeb Logo" class="h-9 w-9 rounded object-cover border border-slate-200" onerror="this.src='https://placehold.co/36x36/1e293b/ffffff?text=CD'">
            <div>
                <span class="font-extrabold text-slate-950 text-sm tracking-tight block leading-none">CodeDeb</span>
                <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">Vehicle/Fleet Management System</span>
            </div>
        </div>

        <div class="hidden lg:flex items-center space-x-6 text-xs px-6 h-full border-l border-slate-100">
            <div class="flex items-center space-x-2">
                <span class="text-slate-400 font-medium">Enterprise Hub Network:</span>
                <span class="text-slate-800 font-bold">Tamghas ⇄ Tansen ⇄ Butwal ⇄ Kawasoti ⇄ Mugling ⇄ Kathmandu</span>
            </div>
            <div class="h-4 w-[1px] bg-slate-200"></div>
            <div class="flex items-center space-x-1.5">
                <span class="text-slate-400 font-medium">Active Fleet:</span>
                <span class="text-slate-900 font-extrabold font-mono-data">${db.vehicles.length} Units</span>
            </div>
        </div>

        <div class="flex items-center space-x-4">
            <div class="text-right hidden sm:block">
                <div class="text-xs font-semibold text-slate-950">${db.manager}</div>
                <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${db.role}</div>
            </div>
            <div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                HM
            </div>
        </div>
    `;
}

function injectSidebar() {
    const sidebarEl = document.getElementById("sidebar-target");
    if (!sidebarEl) return;

    sidebarEl.innerHTML = `
        <div class="p-3">
            <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Operations Portal</div>
            <nav class="space-y-0.5">
                <a href="dashboard.html" class="flex items-center space-x-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 rounded transition-colors" id="nav-dashboard">
                    <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                    <span>Management Console</span>
                </a>
                <a href="departures.html" class="flex items-center space-x-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 rounded transition-colors" id="nav-departures">
                    <i data-lucide="table-properties" class="w-4 h-4"></i>
                    <span>Departure Board</span>
                </a>
                <a href="vehicles.html" class="flex items-center space-x-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 rounded transition-colors" id="nav-vehicles">
                    <i data-lucide="map" class="w-4 h-4"></i>
                    <span>Live Tracking Map</span>
                </a>
                <a href="drivers.html" class="flex items-center space-x-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 rounded transition-colors" id="nav-drivers">
                    <i data-lucide="users" class="w-4 h-4"></i>
                    <span>Drivers & Conductors</span>
                </a>
                <a href="reports.html" class="flex items-center space-x-2.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950 rounded transition-colors" id="nav-reports">
                    <i data-lucide="trending-up" class="w-4 h-4"></i>
                    <span>System Reports</span>
                </a>
            </nav>
        </div>
    `;
}

function highlightActivePage() {
    const pathname = window.location.pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1) || "dashboard.html";
    
    let activeId = "nav-dashboard";
    if (filename.includes("departures")) activeId = "nav-departures";
    if (filename.includes("vehicles")) activeId = "nav-vehicles";
    if (filename.includes("drivers")) activeId = "nav-drivers";
    if (filename.includes("reports")) activeId = "nav-reports";

    const activeEl = document.getElementById(activeId);
    if (activeEl) {
        activeEl.classList.add("active-nav-item");
    }
}

function startClock() {
    // Basic dynamic clock sync if dashboard clocks are on screen
}
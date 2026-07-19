const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const content = fs.readFileSync('dashboard_admin.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("error", (e) => {
  console.log("BROWSER ERROR:", e.message || e);
});
virtualConsole.on("warn", (e) => {
  console.log("BROWSER WARN:", e);
});
virtualConsole.on("log", (e) => {
  console.log("BROWSER LOG:", e);
});

const dom = new JSDOM(content, { 
  runScripts: "dangerously", 
  virtualConsole,
  url: "http://localhost/"
});

setTimeout(() => {
  console.log("Dashboard content length:", dom.window.document.getElementById('main-viewport').innerHTML.length);
  process.exit(0);
}, 1000);

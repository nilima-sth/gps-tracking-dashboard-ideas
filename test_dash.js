const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('dashboard_admin.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const scriptContent = scriptMatch[1];
  const ctx = {
    window: { addEventListener: () => {} },
    document: { 
      getElementById: () => ({}),
      querySelectorAll: () => ({ forEach: () => {} })
    },
    setTimeout: () => {}
  };
  ctx.window.document = ctx.document;
  
  vm.createContext(ctx);
  
  try {
    vm.runInContext(scriptContent, ctx);
    const dashHTML = vm.runInContext('dashboardHTML()', ctx);
    console.log("Dashboard HTML generated length:", dashHTML.length);
  } catch(e) {
    console.error("Runtime error:");
    console.error(e);
  }
} else {
  console.log("No script found");
}

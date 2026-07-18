const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('dashboard_admin.html', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const scriptContent = scriptMatch[1];
  try {
    new vm.Script(scriptContent);
    console.log("Syntax OK");
  } catch (e) {
    console.error("Syntax Error found!");
    console.error(e);
  }
} else {
  console.log("No script tag found.");
}

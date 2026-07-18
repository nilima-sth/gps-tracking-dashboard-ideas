const fs = require('fs');
const path = require('path');

const salesDir = path.join(__dirname, 'sales');
const outputFile = path.join(__dirname, 'js', 'sales_templates.js');

const files = fs.readdirSync(salesDir).filter(f => f.endsWith('.html'));

let outputContent = 'window.OdooSalesTemplates = {\\n';

files.forEach(file => {
  const compName = file.replace('.html', '');
  const filePath = path.join(salesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Escape backticks and dollars for template literals
  const escapedContent = content.replace(/`/g, '\\\\`').replace(/\\$/g, '\\\\$');
  
  outputContent += `  '${compName}': \`${escapedContent}\`,\\n`;
});

outputContent += '};\n';

fs.writeFileSync(outputFile, outputContent, 'utf8');
console.log('Templates built successfully.');

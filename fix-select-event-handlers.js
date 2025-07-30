const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/marketing/MessageTemplateBuilder.tsx',
  'src/components/marketing/CampaignMetrics.tsx',
  'src/components/marketing/CampaignList.tsx',
  'src/components/marketing/CampaignBuilder.tsx',
  'src/components/marketing/CampaignAnalytics.tsx',
  'src/app/marketing/whatsapp/page.tsx',
  'src/app/inhouse-sales/goals/page.tsx',
  'src/app/inhouse-sales/announcements/page.tsx'
];

console.log('🔧 Fixing Select component onChange event handlers...');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    
    // Fix onChange handlers for Material-UI Select components
    // Pattern: onChange={(value) => ...} should be onChange={(e) => { const value = e.target.value; ... }}
    
    // Replace simple value patterns
    content = content.replace(
      /onChange=\{([^}]+) => ([^}]+)\}/g,
      (match, valueParam, body) => {
        if (valueParam.includes('value') && !valueParam.includes('e.target')) {
          // Replace (value) => ... with (e) => { const value = e.target.value; ... }
          const newBody = body.replace(/\bvalue\b/g, 'e.target.value');
          return `onChange={(e) => ${newBody}}`;
        }
        return match;
      }
    );
    
    // More specific patterns for common cases
    const patterns = [
      {
        // setFilterType(value) style
        regex: /onChange=\{\(value\) => set(\w+)\(value\)\}/g,
        replacement: 'onChange={(e) => set$1(e.target.value)}'
      },
      {
        // setState({ ...state, field: value }) style
        regex: /onChange=\{\(value\) => set(\w+)\(\{ \.\.\.(\w+), (\w+): value \}\)/g,
        replacement: 'onChange={(e) => set$1({ ...$2, $3: e.target.value })}'
      },
      {
        // More complex state updates
        regex: /onChange=\{\(value\) => set(\w+)\(\{ \.\.\.(\w+), (\w+): value \}\)/g,
        replacement: 'onChange={(e) => set$1({ ...$2, $3: e.target.value })}'
      }
    ];
    
    patterns.forEach(({ regex, replacement }) => {
      if (regex.test(content)) {
        content = content.replace(regex, replacement);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Fixed Select onChange handlers in: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('🎉 Select onChange handler fixes completed!'); 
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

console.log('🔧 Fixing Select component onValueChange props...');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    
    // Replace onValueChange with onChange for Select components
    if (content.includes('onValueChange')) {
      content = content.replace(/onValueChange=/g, 'onChange=');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Fixed Select components in: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('🎉 Select component fixes completed!'); 
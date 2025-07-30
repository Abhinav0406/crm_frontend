const fs = require('fs');
const path = require('path');

const filesToCheck = [
  'src/app/business-admin/team-management/page.tsx',
  'src/app/business-admin/whatsapp/page.tsx',
  'src/app/platform-admin/dashboard/page.tsx',
  'src/app/inhouse-sales/customers/[id]/page.tsx',
  'src/app/inhouse-sales/tasks/page.tsx',
  'src/app/inhouse-sales/pipeline/page.tsx',
  'src/app/managers/customers/import-export/page.tsx',
  'src/components/marketing/SegmentOverview.tsx',
  'src/components/marketing/WhatsAppCampaignManager.tsx'
];

console.log('🔧 Fixing FlexGrid imports...');

filesToCheck.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    
    // Check if file uses FlexGrid but doesn't import it
    if (content.includes('FlexGrid') && !content.includes('import { FlexGrid }')) {
      // Find the last import statement
      const importRegex = /import.*from.*['"];?\s*\n/g;
      let lastImportMatch;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        lastImportMatch = match;
      }
      
      if (lastImportMatch) {
        const insertPosition = lastImportMatch.index + lastImportMatch[0].length;
        content = content.slice(0, insertPosition) + 
                 'import { FlexGrid } from \'@/components/ui/FlexGrid\';\n' + 
                 content.slice(insertPosition);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Added FlexGrid import to: ${filePath}`);
    } else {
      console.log(`⏭️  No FlexGrid import needed: ${filePath}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('🎉 FlexGrid imports fixed!'); 
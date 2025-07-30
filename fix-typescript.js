const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/tele-calling/assignments/[id]/page.tsx',
  'src/app/managers/assignments/[id]/page.tsx',
  'src/app/business-admin/catalogue/[id]/page.tsx',
  'src/app/business-admin/catalogue/[id]/edit/page.tsx',
  'src/app/business-admin/catalogue/categories/[id]/page.tsx',
  'src/app/business-admin/catalogue/categories/[id]/edit/page.tsx',
  'src/app/business-admin/support/[id]/page.tsx',
  'src/app/platform-admin/support/[id]/page.tsx',
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

console.log('🔧 Starting comprehensive TypeScript error fixes...');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    
    // Fix params.id type annotations
    if (content.includes('const assignmentId = params.id;')) {
      content = content.replace(/const assignmentId = params\.id;/g, 'const assignmentId = params.id as string;');
      modified = true;
    }
    
    if (content.includes('const productId = params.id;')) {
      content = content.replace(/const productId = params\.id;/g, 'const productId = params.id as string;');
      modified = true;
    }
    
    if (content.includes('const categoryId = params.id;')) {
      content = content.replace(/const categoryId = params\.id;/g, 'const categoryId = params.id as string;');
      modified = true;
    }
    
    // Fix supportAPI.getTicket(params.id) calls
    if (content.includes('supportAPI.getTicket(params.id)')) {
      content = content.replace(/supportAPI\.getTicket\(params\.id\)/g, 'supportAPI.getTicket(params.id as string)');
      modified = true;
    }
    
    if (content.includes('supportAPI.getTicketMessages(params.id)')) {
      content = content.replace(/supportAPI\.getTicketMessages\(params\.id\)/g, 'supportAPI.getTicketMessages(params.id as string)');
      modified = true;
    }
    
    if (content.includes('supportAPI.closeTicket(params.id)')) {
      content = content.replace(/supportAPI\.closeTicket\(params\.id\)/g, 'supportAPI.closeTicket(params.id as string)');
      modified = true;
    }
    
    if (content.includes('ticket: params.id,')) {
      content = content.replace(/ticket: params\.id,/g, 'ticket: params.id as string,');
      modified = true;
    }
    
    // Fix function parameter type annotations
    content = content.replace(/const getPriorityColor = \(priority\) =>/g, 'const getPriorityColor = (priority: string) =>');
    content = content.replace(/const getStatusColor = \(status\) =>/g, 'const getStatusColor = (status: string) =>');
    content = content.replace(/const getStatusDisplayName = \(status\) =>/g, 'const getStatusDisplayName = (status: string) =>');
    
    // Add FlexGrid import if Grid item is present and FlexGrid is not imported
    if (content.includes('Grid item') && !content.includes('import { FlexGrid }')) {
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
    
    // Replace Grid container with FlexGrid container
    if (content.includes('<Grid container')) {
      content = content.replace(/<Grid container/g, '<FlexGrid container');
      modified = true;
    }
    
    // Replace Grid item with FlexGrid
    if (content.includes('<Grid item')) {
      content = content.replace(/<Grid item/g, '<FlexGrid');
      modified = true;
    }
    
    // Replace closing Grid tags with FlexGrid
    if (content.includes('</Grid>')) {
      content = content.replace(/<\/Grid>/g, '</FlexGrid>');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('🎉 All TypeScript errors fixed!');
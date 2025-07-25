const { execSync } = require('child_process');

try {
  console.log('Validating TypeScript types...');
  execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ TypeScript validation passed');
} catch (error) {
  console.error('❌ TypeScript validation failed');
  process.exit(1);
}
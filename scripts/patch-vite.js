import fs from 'node:fs';
import path from 'node:path';

const filesToPatch = [
  path.resolve('node_modules/vite/dist/node/chunks/dep-Dm0c1Wj2.js'),
  path.resolve('node_modules/vite/dist/node/module-runner.js')
];

let patchedCount = 0;
for (const file of filesToPatch) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('const postfixRE = /[?#].*$/;')) {
      content = content.replace('const postfixRE = /[?#].*$/;', 'const postfixRE = /\\?.*$/;');
      fs.writeFileSync(file, content, 'utf8');
      patchedCount++;
      console.log(`[patch-vite] Patched ${path.basename(file)} to allow # in workspace directory paths.`);
    } else if (content.includes('const postfixRE = /\\?.*$/;')) {
      console.log(`[patch-vite] ${path.basename(file)} already patched.`);
    }
  }
}
console.log(`[patch-vite] Complete (${patchedCount} files modified).`);

import fs from 'fs';
import path from 'path';

const BANNED_PATTERNS = [
  { pattern: /\bguaranteed\b/i, label: 'guaranteed' },
  { pattern: /\bassured\b/i, label: 'assured' },
  { pattern: /100%/i, label: '100%' },
  { pattern: /\bbest\b/i, label: 'best' },
  { pattern: /\bno\.?\s*1\b/i, label: 'no.1' },
  { pattern: /\bzero\s+risk\b/i, label: 'zero risk' },
  { pattern: /\bhigh\s+appreciation\b/i, label: 'high appreciation' },
  { pattern: /\brisk-free\b/i, label: 'risk-free' },
  { pattern: /\blimited\s+plots\b/i, label: 'limited plots' }
];

const IGNORE_DIRS = ['node_modules', '.next', '.git', 'legacy'];
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md'];

let violations = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.includes(entry.name)) continue;
      scanDir(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (!EXTENSIONS.includes(ext)) continue;

      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // Skip comment lines in check-content script itself or specific compliance disclaimer references
        for (const { pattern, label } of BANNED_PATTERNS) {
          if (pattern.test(line)) {
            violations.push({
              file: path.relative(process.cwd(), fullPath),
              line: index + 1,
              content: line.trim(),
              banned: label
            });
          }
        }
      });
    }
  }
}

console.log('Scanning src/ for banned marketing phrases...');
scanDir(path.join(process.cwd(), 'src'));

if (violations.length > 0) {
  console.error(`\n❌ Found ${violations.length} banned marketing claim violation(s):`);
  violations.forEach(v => {
    console.error(`  - ${v.file}:${v.line} [Banned: "${v.banned}"] -> ${v.content}`);
  });
  console.error('\nPlease replace banned marketing claims with factual, quiet-luxury language.');
  process.exit(1);
} else {
  console.log('✔ Content check passed: 0 banned marketing claims found in src/');
  process.exit(0);
}

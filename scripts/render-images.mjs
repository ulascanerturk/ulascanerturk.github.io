// Renders the static share image and touch icon (faz-4 §2 tasks 2 and 6) from the
// HTML sources in scripts/images/ and strips all metadata. Local tool only — needs
// Google Chrome (or CHROME_PATH) and ImageMagick (`magick`); the PNGs are committed.
//
//   npm run images
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const chrome =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const images = [
  { source: 'scripts/images/og-default.html', output: 'public/og/default.png', size: [1200, 630] },
  {
    source: 'scripts/images/apple-touch-icon.html',
    output: 'public/apple-touch-icon.png',
    size: [180, 180],
  },
];

const work = mkdtempSync(join(tmpdir(), 'render-images-'));
try {
  for (const { source, output, size } of images) {
    const [width, height] = size;
    const shot = join(work, 'shot.png');
    execFileSync(chrome, [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--user-data-dir=${join(work, 'profile')}`,
      `--window-size=${width},${height}`,
      `--screenshot=${shot}`,
      pathToFileURL(join(root, source)).href,
    ]);
    mkdirSync(dirname(join(root, output)), { recursive: true });
    // Crop to the exact size and drop every metadata chunk (Değişmez Kural 1).
    execFileSync('magick', [
      shot,
      '-crop',
      `${width}x${height}+0+0`,
      '+repage',
      '-strip',
      join(root, output),
    ]);
    console.log(`${output} (${width}×${height})`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

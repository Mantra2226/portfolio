import sharp from "sharp";
import path from "path";

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg-glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.18"/>
      <stop offset="50%" stop-color="#065f46" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="corner-glow" cx="10%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#059669" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#09090b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="border-grad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#27272a" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Dark base background -->
  <rect width="100%" height="100%" fill="#09090b"/>
  <!-- Ambient glows -->
  <rect width="100%" height="100%" fill="url(#bg-glow)"/>
  <rect width="100%" height="100%" fill="url(#corner-glow)"/>

  <!-- Outer sleek border frame -->
  <rect x="24" y="24" width="1152" height="582" rx="24" stroke="url(#border-grad)" stroke-width="1.5" fill="none"/>

  <!-- Top availability badge -->
  <g transform="translate(80, 85)">
    <rect width="240" height="36" rx="18" fill="#10b981" fill-opacity="0.12" stroke="#10b981" stroke-opacity="0.3" stroke-width="1"/>
    <circle cx="22" cy="18" r="4.5" fill="#34d399"/>
    <text x="36" y="23" fill="#6ee7b7" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" letter-spacing="0.5">AVAILABLE FOR PROJECTS</text>
  </g>

  <!-- Location badge -->
  <g transform="translate(1000, 85)">
    <text x="120" y="23" text-anchor="end" fill="#71717a" font-family="monospace, monospace" font-size="14">Nairobi, KE</text>
  </g>

  <!-- Main Title -->
  <text x="80" y="240" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="68" font-weight="800" letter-spacing="-1">JOHN KAMAU</text>

  <!-- Subtitle -->
  <text x="80" y="300" fill="#34d399" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600">Full-Stack Software Engineer &amp; Systems Architect</text>

  <!-- Description paragraph -->
  <text x="80" y="370" fill="#a1a1aa" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400">
    <tspan x="80" dy="0">Distributed system design • Real-time IoT telemetry • Event-driven backends</tspan>
    <tspan x="80" dy="32">Next.js • TypeScript • Python • FastAPI • PostgreSQL • Docker</tspan>
  </text>

  <!-- Bottom Bar: Tech and Domain -->
  <g transform="translate(80, 510)">
    <!-- Brand monogram -->
    <rect width="44" height="44" rx="12" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-opacity="0.5"/>
    <text x="22" y="28" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-size="18" font-weight="bold">JK</text>

    <!-- Domain text -->
    <text x="60" y="28" fill="#e4e4e7" font-family="monospace, monospace" font-size="18" font-weight="600">portfolio-jp-kamau.vercel.app</text>

    <!-- GitHub handle -->
    <text x="1040" y="28" text-anchor="end" fill="#71717a" font-family="monospace, monospace" font-size="16">github.com/Mantra2226</text>
  </g>
</svg>
`;

async function run() {
  const publicDir = path.resolve("public");
  const outputPath = path.join(publicDir, "og-image.png");
  await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toFile(outputPath);
  console.log("Successfully generated:", outputPath);
}

run().catch(console.error);

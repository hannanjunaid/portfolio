import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Original, deliberately generic artwork. Replace the generated SVG paths in
// components/projects/content.ts when real portfolio imagery is available.
const palettes = [
  ["#100824", "#30205d", "#a082f6", "#cec1ff"],
  ["#0b0e10", "#303638", "#91a3a1", "#dce9df"],
  ["#52372c", "#a77961", "#e8bea9", "#fff0dc"],
  ["#071b36", "#1a587b", "#73b5d3", "#e4f4f6"],
  ["#263523", "#63966b", "#c5d4a1", "#f5f1db"],
  ["#160e34", "#5635a6", "#a98af3", "#efe9ff"],
  ["#172235", "#3b6685", "#74b8c9", "#e2f6ed"],
  ["#473316", "#b38739", "#e4c786", "#fff3cc"],
  ["#151c2b", "#46637d", "#91abd5", "#f2f4ff"],
];

const titles = ["FUTURE LAB", "MATERIAL SYSTEM", "EVERYDAY FORM", "CIVIC PLATFORM", "STORY SPACE", "DIGITAL STUDIO", "TALENT CLOUD", "COMMUNITY APP", "ASSISTED WORK"];

function desktop(i, light, accent) {
  const lines = Array.from({ length: 8 }, (_, n) => `<rect x="${94 + (n % 2) * 210}" y="${342 + Math.floor(n / 2) * 58}" width="${n % 3 === 0 ? 152 : 172}" height="34" rx="7" fill="${n % 3 === 0 ? accent : light}" opacity="${n % 3 === 0 ? .58 : .13}"/>`).join("");
  return `<g transform="rotate(${i % 2 ? 5 : -6} 350 478)"><rect x="75" y="195" width="550" height="536" rx="27" fill="#080a12" stroke="${light}" stroke-opacity=".5" stroke-width="3"/><rect x="86" y="205" width="528" height="512" rx="18" fill="#10131c"/><rect x="86" y="205" width="528" height="64" rx="18" fill="#171b24"/><circle cx="115" cy="238" r="6" fill="${accent}"/><circle cx="137" cy="238" r="6" fill="${light}" opacity=".5"/><circle cx="159" cy="238" r="6" fill="${light}" opacity=".25"/><rect x="400" y="231" width="174" height="13" rx="6" fill="${light}" opacity=".35"/><text x="110" y="318" fill="${light}" font-family="Arial,sans-serif" font-size="21" font-weight="700" letter-spacing="4">PROJECT ${String(i + 1).padStart(2, "0")}</text>${lines}<path d="M107 639C179 546 235 634 307 545S451 588 579 431" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/><circle cx="579" cy="431" r="12" fill="${light}"/></g>`;
}

function phone(i, light, accent) {
  return `<g transform="rotate(${i % 2 ? 8 : -7} 350 480)"><rect x="211" y="164" width="278" height="625" rx="43" fill="#06080d" stroke="${light}" stroke-opacity=".65" stroke-width="4"/><rect x="223" y="177" width="254" height="598" rx="33" fill="#11161c"/><rect x="297" y="189" width="106" height="18" rx="9" fill="#050608"/><text x="247" y="272" fill="${light}" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="3">PROJECT ${String(i + 1).padStart(2, "0")}</text><circle cx="350" cy="424" r="106" fill="${accent}" opacity=".36"/><circle cx="350" cy="424" r="66" fill="none" stroke="${light}" stroke-opacity=".8" stroke-width="2"/><path d="M286 424c34-63 91-74 128-12" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/><rect x="250" y="588" width="200" height="16" rx="8" fill="${light}" opacity=".65"/><rect x="250" y="622" width="158" height="12" rx="6" fill="${light}" opacity=".3"/><rect x="250" y="688" width="200" height="42" rx="21" fill="${accent}"/></g>`;
}

function tablet(i, light, accent) {
  return `<g transform="rotate(${i % 2 ? -8 : 7} 350 470)"><rect x="73" y="239" width="554" height="450" rx="35" fill="#08090e" stroke="${light}" stroke-opacity=".55" stroke-width="4"/><rect x="88" y="253" width="524" height="420" rx="23" fill="${light}"/><text x="124" y="308" fill="#151515" font-family="Arial,sans-serif" font-size="14" font-weight="700" letter-spacing="4">PROJECT ${String(i + 1).padStart(2, "0")}</text><path d="M88 570C199 462 242 639 364 511s188-35 248-93v255H88Z" fill="${accent}" opacity=".58"/><path d="M88 621C185 551 267 651 385 579S536 582 612 508v165H88Z" fill="#111720" opacity=".8"/><circle cx="350" cy="663" r="4" fill="#fff"/></g>`;
}

const out = join(process.cwd(), "public", "images", "projects");
await mkdir(out, { recursive: true });

for (let i = 0; i < palettes.length; i++) {
  const [dark, mid, accent, light] = palettes[i];
  const motif = Array.from({ length: 13 }, (_, n) => {
    const x = (n * 157 + i * 83) % 780 - 40;
    const y = (n * 229 + i * 101) % 920 + 28;
    const radius = 14 + (n * 23) % 58;
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${n % 2 ? light : accent}" opacity="${n % 3 === 0 ? .29 : .14}"/>`;
  }).join("");
  const mockup = i % 3 === 0 ? desktop(i, light, accent) : i % 3 === 1 ? phone(i, light, accent) : tablet(i, light, accent);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 1000" role="img" aria-label="Abstract portfolio project placeholder"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${dark}"/><stop offset=".55" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></linearGradient><radialGradient id="glow"><stop stop-color="${accent}" stop-opacity=".65"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient><pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="${light}" stroke-opacity=".12"/></pattern></defs><rect width="700" height="1000" fill="url(#bg)"/><rect width="700" height="1000" fill="url(#grid)"/><circle cx="${i % 2 ? 590 : 120}" cy="380" r="350" fill="url(#glow)"/>${motif}<path d="M-70 190C156 51 354 350 770 102" fill="none" stroke="${light}" stroke-opacity=".25" stroke-width="2"/><path d="M-60 732C200 580 394 930 770 656" fill="none" stroke="${accent}" stroke-opacity=".45" stroke-width="3"/>${mockup}<text x="40" y="890" fill="${light}" fill-opacity=".38" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="5">${titles[i]}</text></svg>`;
  await writeFile(join(out, `project-${String(i + 1).padStart(2, "0")}.svg`), svg);
}

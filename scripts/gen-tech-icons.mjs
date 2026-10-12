import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const slugs = [
  "react",
  "nextdotjs",
  "firebase",
  "vercel",
  "python",
  "pydantic",
  "langchain",
  "googlegemini",
  "typescript",
  "javascript",
  "fastapi",
  "nodedotjs",
  "express",
  "tailwindcss",
  "postgresql",
  "mongodb",
  "supabase",
  "redis",
  "docker",
  "git",
  "github",
  "socketdotio",
  "webrtc",
  "tensorflow",
  "pytorch",
  "keras",
  "opencv",
  "scikitlearn",
  "render",
  "grafana",
  "scrapy",
  "google",
];

const out = {};
for (const slug of slugs) {
  const file = join("node_modules", "simple-icons", "icons", `${slug}.svg`);
  const svg = readFileSync(file, "utf8");
  const title = /<title>([^<]+)<\/title>/.exec(svg)?.[1] ?? slug;
  const path = svg.split('"', 8)[7];
  if (!path || !/^m/i.test(path)) throw new Error(`bad path for ${slug}`);
  out[slug] = { title, path };
}

const body = Object.entries(out)
  .map(
    ([slug, { title, path }]) =>
      `  "${slug}": {\n    title: ${JSON.stringify(title)},\n    path: ${JSON.stringify(path)},\n  },`
  )
  .join("\n");

writeFileSync(
  "src/lib/tech-icons.generated.ts",
  `// AUTO-GENERATED from the \`simple-icons\` package (CC0-1.0).\n// Run \`npm run gen:tech-icons\` to refresh. Do not edit by hand.\n\nexport interface TechIcon {\n  title: string;\n  path: string;\n}\n\nexport const techIconPaths: Record<string, TechIcon> = {\n${body}\n};\n`,
  "utf8"
);

console.log(`wrote ${slugs.length} icons`);
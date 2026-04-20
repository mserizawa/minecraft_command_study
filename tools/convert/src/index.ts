import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const DATA_URL =
  "https://raw.githubusercontent.com/misode/mcmeta/summary/commands/data.json";

const OUTPUT_PATH = resolve(
  fileURLToPath(import.meta.url),
  "../../../..",
  "src/data/commands.json"
);

// Brigadier ノードの型定義
type BrigadierNode = {
  type: "root" | "literal" | "argument";
  children?: Record<string, BrigadierNode>;
  executable?: boolean;
  redirect?: string[];
  parser?: string;
  properties?: Record<string, unknown>;
  permissions?: unknown;
};

type CommandArg = {
  name: string;
  type: string;
  required: boolean;
};

type CommandEntry = {
  id: string;
  command: string;
  description: string;
  args: CommandArg[];
};

// 引数ノードをツリーから再帰的に収集（重複除去）
function collectArgs(
  node: BrigadierNode,
  depth: number,
  seen: Set<string>
): CommandArg[] {
  const args: CommandArg[] = [];

  if (!node.children) return args;

  for (const [name, child] of Object.entries(node.children)) {
    if (child.type === "argument") {
      const key = `${name}:${child.parser ?? "unknown"}`;
      if (!seen.has(key)) {
        seen.add(key);
        // executable が立っていない = このノードを経由しないと実行できない = 必須に近い
        // ただし Brigadier では必須/省略可の概念が深さで表現されるため、
        // depth=0 のものを required:true、それ以降を false とする簡易判定
        args.push({
          name,
          type: child.parser ?? "unknown",
          required: depth === 0,
        });
      }
      // 子孫も収集（深さを増やして再帰）
      args.push(...collectArgs(child, depth + 1, seen));
    } else if (child.type === "literal") {
      // literal ノードはサブコマンド（例: time set の "set"）として扱う
      args.push(...collectArgs(child, depth, seen));
    }
  }

  return args;
}

async function main() {
  console.log("misode/mcmeta からデータを取得中...");
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);

  const root = (await res.json()) as BrigadierNode;
  const commandNodes = root.children ?? {};

  const commands: CommandEntry[] = [];

  for (const [name, node] of Object.entries(commandNodes)) {
    // redirect のみのコマンド（/tp → /teleport）はスキップ
    if (node.redirect && !node.children) continue;

    const seen = new Set<string>();
    const args = collectArgs(node, 0, seen);

    commands.push({
      id: name,
      command: `/${name}`,
      description: "",
      args,
    });
  }

  // アルファベット順にソート
  commands.sort((a, b) => a.id.localeCompare(b.id));

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(commands, null, 2), "utf-8");

  console.log(`完了: ${commands.length} 件のコマンドを出力しました`);
  console.log(`出力先: ${OUTPUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

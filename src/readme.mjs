import fs from "fs-extra"
import path from "path"

export function generateReadme(state){
  const t=[
    "# RepoControl",
    "",
    "Repo: "+(state.repo||""),
    "Branch: "+(state.branch||""),
    "",
    "Features:",
    "- Interactive repo control",
    "- ZIP extract and full reset",
    "- File management",
    "- Git operations",
    "- Presets and dry-run",
    "- Plugins and tools",
    "",
    "Usage:",
    "repocontrol"
  ].join("\n")
  const p=path.join(state.workdir||process.cwd(),"README_REPOCONTROL.md")
  fs.writeFileSync(p,t)
  return p
}
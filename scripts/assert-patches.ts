import {globSync, readFileSync} from 'node:fs';

const CHECKS: {label: string; pattern: string; needle: string}[] = [
  {
    label: '@nuxtjs/mdc MDCRenderer',
    pattern:
      'node_modules/.pnpm/**/node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue',
    needle: 'Sync setup() components must hydrate immediately',
  },
  {
    label: '@nuxt/content ContentRenderer',
    pattern:
      'node_modules/.pnpm/**/node_modules/@nuxt/content/dist/runtime/components/ContentRenderer.vue',
    needle: 'Keep already-resolved setup() components sync',
  },
  {
    label: '@nuxt/image NuxtImg',
    pattern:
      'node_modules/.pnpm/**/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue',
    needle: 'const imgEl = ref(null)',
  },
];

/**
 * Fail generate/build when pnpm did not materialize a patched store copy.
 * Extra unpatched peer variants can linger in a dirty node_modules; Coolify
 * installs from the lockfile and must have at least one `patch_hash=` folder.
 */
function assertPatchedStoreCopy(
  label: string,
  pattern: string,
  needle: string,
): void {
  const files = globSync(pattern);
  if (files.length === 0) {
    throw new Error(`No installed files for ${label} (${pattern}).`);
  }
  const hashed = files.filter((file) => file.includes('patch_hash='));
  if (hashed.length === 0) {
    throw new Error(
      `pnpm did not apply the patch for ${label} (no patch_hash store folder). Coolify/Nixpacks pnpm 9 ignores patchedDependencies in pnpm-workspace.yaml; they must also live in package.json#pnpm.patchedDependencies.`,
    );
  }
  const unpatchedHashed = hashed.filter(
    (file) => !readFileSync(file, 'utf8').includes(needle),
  );
  if (unpatchedHashed.length > 0) {
    throw new Error(
      `Patched store copy for ${label} is missing the Vue 3.5 hydration fix:\n${unpatchedHashed.join('\n')}`,
    );
  }
  console.log(
    `Patch OK: ${label} (${hashed.length} patched store copies, ${files.length} total)`,
  );
}

for (const check of CHECKS) {
  assertPatchedStoreCopy(check.label, check.pattern, check.needle);
}

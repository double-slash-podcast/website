import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  // files: ['**/*.ts', '**/*.tsx'],
  rules: {
    'vue/no-multiple-template-root': 0,
    'vue/multi-word-component-names': 0,
  },
});

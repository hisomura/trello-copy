module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
};

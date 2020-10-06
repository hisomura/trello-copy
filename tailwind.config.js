module.exports = {
  purge: [
    "./src/components/**/*.tsx",
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
};

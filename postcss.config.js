export default {
  plugins: {
    autoprefixer: {},
    ...(process.argv.includes('development')
      ? {}
      : {
          cssnano: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        }),
  },
};

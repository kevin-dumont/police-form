module.exports = {
  bundle: true,
  platform: 'node',
  target: ['node18'],
  entryPoints: ['src/index.ts'],
  outfile: 'build/index.js',
  treeShaking: true,
  allowOverwrite: true,
  loader: {
    '.node': 'copy',
  },
  define: {
    'require.resolve': 'require',
  },

  minify: false,
  sourcemap: false,
  sourcesContent: false,
  legalComments: 'none',
};

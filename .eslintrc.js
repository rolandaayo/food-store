module.exports = {
  extends: 'next/core-web-vitals',
  // Remove any custom parser configuration that might be causing the serialization error
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
} 
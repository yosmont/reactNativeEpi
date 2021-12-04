module.exports = function(api) {
  api.cache(true);
  return {
      presets: ['babel-preset-expo'],
      plugins: [
          [
              require.resolve('babel-plugin-module-resolver'),
              {
                  root: ["./"],
                  alias: {
                      "@root": ".",
                      "@src": "./src",
                      "@components": "./src/components",
                      "@views": "./src/views"
                  },
                  "extensions": [".ios.js", ".android.js", ".js", ".json"]
              }
          ]
      ]
  };
};

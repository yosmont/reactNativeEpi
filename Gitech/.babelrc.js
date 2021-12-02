const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["./src"],
      alias: {
        "@src": "Gitech/src",
      },
      "extensions": [".ios.js", ".android.js", ".js", ".json"]
    }
  ]
];

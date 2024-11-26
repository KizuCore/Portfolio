const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@style": path.resolve(__dirname, "src/Assets/style"),
      "@image": path.resolve(__dirname, "src/Assets/images"),
      "@pdf": path.resolve(__dirname, "src/Assets/pdf"),
      "@sound": path.resolve(__dirname, "src/Assets/sound"),
      "@component": path.resolve(__dirname, "src/Assets/components"),
      "@utils": path.resolve(__dirname, "src/Assets/components/Utils"),
    },
  },
};

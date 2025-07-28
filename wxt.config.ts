import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/module-react"],

  manifest: ({ browser, manifestVersion, mode, command }) => ({
    manifest_version: 3,
    name: "Reddit Analyzer",
    description: "Lets you analyze",
    version: "1.0.0",
    permissions: [
      "storage",
      "tabs",
      "contextMenus",
      "activeTab",
      "scripting",
      "declarativeContent",
    ],

     // 👇 Must be inside the manifest config
    // web_accessible_resources: [
    //   {
    //     resources: ["popup/style.css"],
    //     matches: ["*://*/*"],
    //   },
    // ],
  }),
});

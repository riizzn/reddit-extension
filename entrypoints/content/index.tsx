import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
   

    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        switch (message.action) {
          case "post":
             const  ui = await createUi(ctx, "post");
             ui.mount()
            break;

          case "comment":
             const commentUi = await createUi(ctx, "comment");
             commentUi.mount()
            break;
          default:
            break;
        }
      }
    );

  
  },
});

const createUi = async (ctx: any, message: string) => {
  return createShadowRootUi(ctx, {
    name: "post-element",
    position: "inline",
    // use new wxt on mount
    onMount: (container) => {
      const styles = {
        visibility: "visible",
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        zIndex: "9999",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      };
      Object.assign(container.style, styles);
      const app = document.createElement("div");
      container.append(app);

      const root = ReactDOM.createRoot(app);
      root.render(
        <React.StrictMode>
          <h1 className="bg-amber-500 h-[300px]">Hello world,{message}</h1>
        </React.StrictMode>
      );
      return root;
    },
    // --- END UPDATED CODE BLOCK ---
    onRemove(root) {
      root?.unmount();
    },
  });
};

import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { CreateContentElement } from "./common";
import Header from "./common/Header";
import PostModal from "./posts";

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
      return CreateContentElement(container, (root) => {
       const  onRemove= ()=> {
      root?.unmount();
      container.style.visibility="hidden";
    };
        return <PostModal posts={[]} onRemove={onRemove}/>
        
      }) as ReactDOM.Root;
    },onRemove(root){
      root?.unmount();
    }
    
    
  });
};

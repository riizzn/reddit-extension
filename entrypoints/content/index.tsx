import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { CreateContentElement } from "./common";
import Header from "./common/Header";
import PostModal from "./posts";
import { ContentScriptContext } from "#imports";
import CommentModal from "./comments";
import { extractComments, extractPosts } from "./scripts/scrap";
import { Toaster } from 'react-hot-toast';


export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    chrome.runtime.onMessage.addListener(
      async (message, sender, sendResponse) => {
        switch (message.action) {
          case "post":
            const ui = await createUi(ctx, "posts");
            ui.mount();
            break;

          case "comment":
            const commentUi = await createUi(ctx, "comment");
            commentUi.mount();
            break;
          default:
            break;
        }
      }
    );
  },
});

const createUi = async (
  ctx: ContentScriptContext,
  type: "posts" | "comment"
) => {
  return createShadowRootUi(ctx, {
    name: "post-element",
    position: "inline",
    // use new wxt on mount
    onMount: (container) => {
      return CreateContentElement(container, (root) => {
        const onRemove = () => {
          root?.unmount();
          container.style.visibility = "hidden";
        };
        const posts = extractPosts();
        
      
   
        switch (type) {
          case "posts":
            return <PostModal posts={posts} onRemove={onRemove} />;
          case "comment":
              const comment= extractComments();
            return <CommentModal post={posts[0]} comments={comment} onRemove={onRemove} />;

          default:
            return "";
        }
      }) as ReactDOM.Root;
    },
    onRemove(root) {
      root?.unmount();
    },
  });
};

import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

export const CreateContentElement = (
  container: HTMLElement,

  callback: (root: ReactDOM.Root) => React.ReactNode
): ReactDOM.Root => {
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
      <Toaster />
      {callback(root)}
    </React.StrictMode>
  );

  return root;
};

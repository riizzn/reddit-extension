# Extension Directory Structure

- **.output**  
  Final version of your extension (do not edit)

- **entrypoints/**  
  Where your actual extension logic starts

- **components/**  
  Reusable UI stuff (React)

- **assets/**, **public/**  
  Images, icons, static files

- **hooks/**, **utils/**, **composables/**  
  Logic helpers

- **wxt.config.ts**  
  The **brain** of the extension — tells WXT what to build

- **.env**  
  Your secret settings (API keys, etc.)

## How They Communicate

- **Content Script → Background:** "Here's all the Reddit data I collected"
- **Popup → Background:** "User wants to see relevant posts about 'machine learning'"
- **Background → OpenAI API:** "Please summarize these comments"
- **Background → Popup:** "Here are your filtered and summarized results"
- **Popup:** displays results to user

---

### Data Flow

1. **Reddit Page Opens**
   - ↓
2. **Content Script extracts posts/comments**
   - ↓
3. **Data sent to Background Worker**
   - ↓
4. **Background calls OpenAI API for summaries**
   - ↓
5. **Results cached in Background storage**
   - ↓
6. **User clicks extension icon → Popup opens**
   - ↓
7. **Popup requests data from Background**
   - ↓
8. **Popup displays nice UI with summaries**

| Part               | Acts like…                  | Can access page DOM? | Can use Chrome APIs?   | Lives long?  |
| ------------------ | --------------------------- | -------------------- | ---------------------- | ------------ |
| **Popup**          | Your extension’s visible UI | ❌ No                | ✅ Yes                 | ❌ Short     |
| **Background**     | The brain / controller      | ❌ No                | ✅ Yes                 | 🟡 Temporary |
| **Content Script** | Spy inside the webpage      | ✅ Yes               | ❌ No (needs messages) | ✅           |

# Form Handling Structure

- **Custom Hook (useFormData)**  
  Provides data storage logic

- **Component (CredentialForm)**  
  Handles UI and user interactions

- **handleChange & handleSubmit**  
  Connect user actions to data storage

  ***

  # Chrome Extension Context Menus

- **Why Context Menus Must Be in the Background Script**  
  Context menus in Chrome extensions must be implemented in the background script due to Chrome's extension architecture.

- **Persistent Lifecycle**  
  Background scripts run continuously, ensuring context menus are available at all times, unlike content scripts that only execute on specific pages defined by the `matches` pattern.  
  Example:

  ```javascript
  // Background script
  chrome.contextMenus.create({ ... }); // Works
  ```

- **Global Availability**  
  Context menus need to be accessible on any webpage when a user right-clicks. Background scripts manage menus across all websites, unlike content scripts limited to specific pages.

- **Chrome Security Model**  
  Chrome restricts context menu creation to background scripts with the necessary permissions. Content scripts interact with specific webpages, and popups only exist when activated.

- **Analogy**

  - Background Script: Restaurant manager setting up the menu board (context menu) available across all websites.
  - Content Script: Waiter operating at specific webpages to process data.
  - Popup: Customer interface showing results but not controlling the menu.

- **Implementation Flow**

  - Background script creates the context menu on extension load.
  - User right-clicks to see menu options.
  - User selects an option (e.g., "Analyze Comments").
  - Background script communicates with content script to perform the action.
  - Content script extracts data and sends results back.
  - Results are displayed in a popup or on the webpage.

- **Why Content Scripts Cannot Be Used**  
  Attempting to create context menus in a content script results in an error due to Chrome's design:

  ```javascript
  // content-script.js
  chrome.contextMenus.create({ ... }); // Error: Context menus can only be created in background scripts
  ```

- **Conclusion**  
  Chrome's extension architecture designates background scripts as the control center for persistent features like context menus, ensuring consistent availability and security.

  ***

  ## Chrome Extension Permissions Explained

Your `manifest.json` permissions grant your extension access to specific Chrome APIs:

| Permission               | What It Does                               | Why You Need It / Example Use                |
| ------------------------ | ------------------------------------------ | -------------------------------------------- |
| **"storage"**            | Access `chrome.storage.*`                  | Save/retrieve user data (API keys, settings) |
| **"tabs"**               | Interact with browser tabs                 | Get tab URL, title, tabId, favicon           |
| **"contextMenus"**       | Add custom right-click menu items          | “Summarize this”, “Highlight key points”     |
| **"activeTab"**          | Temporary access to current tab’s contents | Run scripts after user clicks extension      |
| **"scripting"**          | Inject and run JS in web pages             | Scrape Reddit, extract DOM elements          |
| **"declarativeContent"** | Control when extension is active/visible   | Show extension only on reddit.com            |

---

### Examples

- **storage**

  ```js
  chrome.storage.local.set({ apiKey: "xyz" });
  chrome.storage.local.get(["apiKey"], (result) => console.log(result));
  ```

- **tabs**

  ```js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log(tabs[0].url);
  });
  ```

- **contextMenus**

  ```js
  chrome.contextMenus.create({
    title: "Summarize This",
    contexts: ["selection"],
    id: "summarize",
  });
  ```

- **activeTab & scripting**

  ```js
  chrome.scripting.executeScript({
    target: { tabId },
    func: () => console.log(document.body.innerText),
  });
  ```

- **declarativeContent**

  ```js
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: "reddit.com" },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    },
  ]);
  ```

  ***

## Both Work, But There's a Key Difference

### Version 1: Function Parameter

```typescript
export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {});
});
```

### Version 2: Main Property

```typescript
export default defineBackground({
  main() {
    chrome.runtime.onInstalled.addListener(() => {});
  },
});
```

## The Key Differences

### 1. Flexibility

```typescript
// Version 1: Limited to just the function
defineBackground(() => {
  // Only code execution, nothing else
});

// Version 2: Object with multiple properties
defineBackground({
  type: "module", // Can specify type
  main() {
    // Main code
    // Your logic here
  },
  persistent: false, // Can configure other options (in some cases)
});
```

### 2. Configuration Options

Version 2 allows you to configure background script behavior:

```typescript
export default defineBackground({
  type: "module", // Modern ES modules
  main() {
    // Your code here
  },
});
```

### 3. Readability

Version 2 is more explicit about what's happening:

- `main()` clearly indicates this is your main logic
- Easy to add other properties later

## In Practice

For your use case, both work exactly the same since you're just running code. But Version 2 (with `main`) is more future-proof and explicit.

## Recommendation

Stick with Version 2 (`main`) because:

- It's more explicit and readable
- Easier to add configuration later
- Follows WXT's recommended pattern
- Better IDE support

When you added `main()`, you didn't break anything—you just made it more organized and configurable 

---

## Content Script
This sets up a message listener in the content script.

- Listens for messages sent from the background script or popup.
- The callback receives:
  - `request`: the data sent (e.g., `{ action: "post" }`)
  - `sender`: information about who sent the message
  - `sendResponse`: a function to reply to the message

The listener is injected into all webpages and handles messages such as `{ action: "post" }` or `{ action: "comment" }`, logging and responding to those actions as appropriate.

---
## Key Configuration Options Explained

| Part                     | What It Means                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `cssInjectionMode: "ui"` | Ensures your styles (e.g., Tailwind) are applied safely and cleanly to your custom UI within the page.                   |
| `async main(ctx)`        | Entry point for your script logic—runs on the page, allowing access to page elements and message listeners.               |
| `ctx`                    | A context object providing information about the current page or tab, and utilities such as style injection. 

## What is a Root in React?

A **root** is the entry point where React renders its components into the DOM. Think of it as a dedicated "parking spot" for React on your webpage.

### How It Works

1. **You have a regular webpage** — just normal HTML.
2. **You want to add React content** — such as buttons, text, or other UI elements.
3. **React needs a specific place to render** — it can't just insert content anywhere.
4. **You provide a container element** — this is the root, where React will manage everything inside.

### Example

```javascript
const app = document.createElement("div");      // Create a container element
const root = ReactDOM.createRoot(app);          // Assign React control to this container
root.render(<h1>Hello world</h1>);              // React renders content inside the container
```

**Step by step:**
- Create an empty container (the `div`).
- Tell React, "this container is yours" (create the root).
- React renders its content (like `<h1>Hello world</h1>`) inside the container.

### Summary

The root is simply React's way of knowing which part of the webpage it controls. Without a root, React wouldn't know where to render its components.

---
## The Core Issue: WXT Framework Changed the `onMount` Function Signature

The WXT framework updated the signature (parameters) of the `onMount` function for `createShadowRootUi`.

---

### Old Code (Not Working)

```typescript
onMount: (uiContainer, shadow, shadowContainer) => {
  // ... rest of the code
  uiContainer.append(app); // Trying to append to the first argument
  // ...
  Object.assign(shadowContainer.style, styles); // Trying to style the third argument
},
```

---

### New Code (Working)

```typescript
onMount: (container) => {
  // ... rest of the code
  container.append(app); // Appending directly to the single argument
  // ...
  Object.assign(container.style, styles); // Styling the single argument directly
},
```

---

### Explanation

**Function Signature Change:**
- **Old:** The `onMount` function expected three arguments: `(uiContainer, shadow, shadowContainer)`.
- **New:** The `onMount` function now expects only one argument: `(container)`.

**What the Argument Represents:**
- **Old:** The third argument, `shadowContainer`, was intended to be the main DOM element inside the Shadow DOM for your UI. With the update, `shadowContainer` became `undefined`, causing errors when trying to use it.
- **New:** The single argument, `container`, is the correct DOM element provided by WXT inside the Shadow DOM. You should append your application and apply styles directly to this element.

**Impact of the Change:**
- **Old Code Failure:** Using `shadowContainer` (now `undefined`) caused errors like `undefined.style`. Appending to `uiContainer` might not have worked as intended.
- **New Code Success:** Using the single, correct `container` argument ensures the React app is appended
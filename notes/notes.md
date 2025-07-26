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
8. **Popup displays nice UI with  summaries**
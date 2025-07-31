#  Reddit Insight Extension

A Chrome extension that gives you AI-powered insights into Reddit posts and comments. Built with modern web technologies and powered by the Gemini API.

## What does it do?

Ever found yourself scrolling through a massive Reddit thread wondering "what's the TL;DR here?" or "what are people actually saying about this?" This extension has you covered. Just right-click anywhere on Reddit and get instant AI-powered summaries and insights.

##  Features

**Right-click Context Menu**
- **Posts Insight**: Get AI-generated summaries and analysis of Reddit posts
- **Comments Insight**: Quickly understand what the community is saying with comment summaries

**Clean UI Experience**
- Modal window appears right on the page (no new tabs or popups)
- Uses Shadow DOM so it won't mess with Reddit's styling
- Secure API key storage through Chrome's built-in storage

**Privacy First**
- Your API keys stay on your device
- No data sent to third-party servers (except Gemini for processing)

##  Built With

- **WXT** - Modern Chrome extension framework that doesn't increase your blood pressure
- **React + TypeScript** - Because react is the shi
- **Tailwind CSS** - For styling that actually works in Shadow DOM
- **Lucide React** - Clean, consistent icons
- **Gemini API** - The AI that makes the magic happen and its free 

##  Getting Started

```bash
# Grab the code
git clone https://github.com/your-username/reddit-insight-extension.git
cd reddit-insight-extension

# Install the goods
pnpm install

# Fire it up for development
pnpm run dev

# Build it when you're ready to ship
pnpm run build
```

Once built, head to Chrome's extension management page, enable Developer Mode, and load the `dist/` folder.

##  How to Use

1. Visit any Reddit page
2. First time? You'll need to add your Gemini API key in the popup
3. Right-click anywhere and look for the Reddit Analyzer options
4. Choose "Posts Insight" or "Comments Insight" 
5. Watch the AI work its magic


##  What's Next

This is just the beginning! Here's what I'm working on:

- Better error handling 
- More intelligent context understanding
- UI improvements based on real usage
- Performance optimizations

##  Contributing

Found a bug? Have an idea? Want to make it better? Pull requests are welcome! This project is still young and could use all the help it can get.



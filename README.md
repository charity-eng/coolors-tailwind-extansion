# Coolors → Tailwind Chrome Extension

Fast and simple Chrome extension that converts Coolors.co hex colors to their closest Tailwind CSS equivalents.

## 🚀 Installation

### For Development

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/charity-eng/coolors-tailwind-extansion.git
   cd coolors-tailwind-extension
   npm install
   ```

2. **Build the extension:**

   ```bash
   npm run dev
   ```

3. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `dist` folder

### For Users

Download from the Chrome Web Store (link coming soon)

## 📖 Usage

### Single Palette Page

1. Go to any Coolors.co palette (e.g., `https://coolors.co/504746-b89685-bfada3-fbb7c0-b6244f`)
2. Click the extension icon
3. See Tailwind matches in a grid
4. Click any color swatch to copy its Tailwind class

### Trending/Multiple Palettes Page

1. Go to `https://coolors.co/palettes/trending`
2. Click the extension icon
3. See all palettes organized by name
4. **Click any color** to copy individual class
5. **Copy All** to copy all classes for a palette (space-separated)
6. **Save JSON** to download palette data with mappings
7. **Collapse/Expand** palettes with the ▼ button

## ⚡ Features

- **Blazing fast**: Uses optimized RGB distance calculation (~0.01ms per color)
- **Smart detection**: Handles both single and multiple palette pages
- **Grouped palettes**: Shows palettes by name on trending pages
- **Multiple copy options**:
  - Click any color to copy individual Tailwind class
  - "Copy All" button for all classes in a palette
  - "Save JSON" to download palette data
- **Collapsible palettes**: Collapse/expand to focus on what you need
- **3x3 grid layout**: Shows all 9 colors per palette beautifully
- **Clean UI**: Beautiful gradient header and smooth animations

## 🎯 How It Works

1. **Extraction**:

   - **Trending pages**: Finds all `.palette-card` elements and extracts colors + titles
   - **Single palette**: Scans `.generator_color_hex` elements, text content, and URL paths

2. **Grouping**: Organizes colors by palette (9 colors each on trending pages)

3. **Matching**: Uses Euclidean distance in RGB space for speed

   - Compares against all 242 Tailwind colors
   - Returns closest match for each color

4. **Display**:

   - Shows palettes as collapsible cards with titles
   - 3x3 grid layout for the typical 9 colors
   - Multiple export options (copy all, save JSON)

5. **Export formats**:
   - **Copy All**: `blue-500 cyan-400 teal-600...` (space-separated)
   - **Save JSON**: Full mapping with original hex, Tailwind class, and Tailwind hex

## 📦 Project Structure

```
coolors-tailwind-extension/
├── src/
│   └── popup.js              # ⚙️ Core extension logic
│                             # - Tailwind color palette (242 colors)
│                             # - Color matching algorithm
│                             # - DOM manipulation & UI logic
│
├── public/                   # 📄 Static files (source)
│   ├── manifest.json         # Extension configuration
│   │                         # - Permissions, icons, popup settings
│   │                         # - Version number (synced from package.json)
│   ├── popup.html            # Extension popup UI structure
│   ├── popup.css             # Styles for popup interface
│   ├── icon16.png            # Toolbar icon (16×16px)
│   ├── icon48.png            # Extension management icon (48×48px)
│   ├── icon128.png           # Chrome Web Store icon (128×128px)
│   ├── privacy-policy.html   # Privacy policy page
│   └── terms-of-use.html     # Terms of service page
│
├── dist/                     # 🏗️ Built extension (auto-generated)
│   ├── popup.js              # Bundled & minified JavaScript
│   ├── manifest.json         # Copied from public/
│   ├── popup.html            # Copied from public/
│   ├── popup.css             # Copied from public/
│   ├── icon*.png             # All icon files
│   ├── privacy-policy.html   # Copied from public/
│   └── terms-of-use.html     # Copied from public/
│
│   ⚠️ This folder is loaded in Chrome for testing
│   ⚠️ Never edit files here - they're regenerated on each build
│
├── extension.zip             # 📦 Production package (auto-generated)
│                             # Ready to upload to Chrome Web Store
│                             # Contains all files from dist/ folder
│
├── build.js                  # 🔨 Build automation script
│                             # - Bundles src/popup.js with esbuild
│                             # - Copies public/ files to dist/
│                             # - Creates extension.zip for production
│
├── package.json              # 📋 Project configuration
│                             # - Dependencies (esbuild, archiver)
│                             # - Build scripts
│                             # - Version management
│
├── package-lock.json         # 🔒 Locked dependency versions
├── .gitignore                # 🚫 Git exclusions (node_modules, dist, etc.)
├── structure.txt             # 📊 Project structure snapshot
└── README.md                 # 📖 You are here!
```

### Key Directories Explained

**`src/`** - Source code that gets compiled

- Write your JavaScript here
- ES modules supported
- Gets bundled by esbuild into a single file

**`public/`** - Static assets copied as-is

- HTML, CSS, images, manifest
- Edit these files directly
- Changes here require a rebuild to show in `dist/`

**`dist/`** - Build output (don't edit manually!)

- Generated by `build.js` script
- This is what Chrome loads
- Deleted and recreated on each build
- Add to `.gitignore` (optional but recommended)

**`extension.zip`** - Production artifact

- Only created with `npm run build` or `publish:*` commands
- Upload this to Chrome Web Store
- Contains minified, production-ready code

## 🛠️ Development Scripts

### Quick Reference

| Command                 | Purpose                    | When to Use                      |
| ----------------------- | -------------------------- | -------------------------------- |
| `npm run watch`         | Auto-rebuild on changes    | Daily development                |
| `npm run dev`           | Single development build   | Quick testing                    |
| `npm run build`         | Production build + ZIP     | Before publishing                |
| `npm run publish:patch` | Bump patch version + build | Bug fixes (1.0.0 → 1.0.1)        |
| `npm run publish:minor` | Bump minor version + build | New features (1.0.0 → 1.1.0)     |
| `npm run publish:major` | Bump major version + build | Breaking changes (1.0.0 → 2.0.0) |
| `npm run structure`     | Generate structure.txt     | Document project layout          |
| `npm outdated`          | Check for updates          | Maintenance                      |
| `npm update`            | Update dependencies        | Keep packages current            |

### Daily Development

**Option 1: Watch Mode (Recommended)**

```bash
npm run watch
```

- Auto-rebuilds when you save files in `src/` or `public/`
- Keeps running until you stop it (Ctrl+C)
- After changes, just reload the extension in Chrome

**Option 2: Manual Build**

```bash
npm run dev
```

- Builds once without minification
- Includes source maps for debugging
- Faster than production builds

**After building:**

1. Go to `chrome://extensions/`
2. Click the refresh icon ↻ on your extension card
3. Test your changes

**What happens during development builds:**

- ✅ Bundles `src/popup.js` → `dist/popup.js` (not minified)
- ✅ Copies all `public/` files → `dist/`
- ✅ Includes source maps for debugging
- ❌ Does NOT change version numbers
- ❌ Does NOT create extension.zip

### Publishing to Chrome Web Store

When you're ready to publish a new version, use these commands:

```bash
# Bug fixes and small patches
npm run publish:patch    # 1.0.0 → 1.0.1

# New features (backwards compatible)
npm run publish:minor    # 1.0.0 → 1.1.0

# Breaking changes
npm run publish:major    # 1.0.0 → 2.0.0
```

**What happens during publish:**

1. ✅ Bumps version in `package.json`
2. ✅ Syncs version to `public/manifest.json`
3. ✅ Creates production build:
   - Minifies JavaScript
   - Removes source maps
   - Optimizes for size
4. ✅ Generates `extension.zip` (ready to upload)

**Then:**

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Select your extension (or create new listing)
3. Upload `extension.zip`
4. Fill in store listing details (first time only)
5. Submit for review

### Behind the Scenes

**`build.js` workflow:**

```
┌─────────────────────────────────────────────┐
│ 1. Check flags (--watch, --prod)           │
├─────────────────────────────────────────────┤
│ 2. Run esbuild on src/popup.js             │
│    - Bundle dependencies                    │
│    - Minify if --prod flag                  │
│    - Generate source maps if dev            │
├─────────────────────────────────────────────┤
│ 3. Copy public/ → dist/                     │
│    - manifest.json                          │
│    - popup.html, popup.css                  │
│    - All icons                              │
│    - privacy-policy.html, terms-of-use.html │
├─────────────────────────────────────────────┤
│ 4. Create extension.zip (--prod only)       │
│    - Archive entire dist/ folder            │
│    - Compress with maximum compression      │
└─────────────────────────────────────────────┘
```

### Maintenance Scripts

```bash
# Check which packages have updates available
npm outdated

# Update to latest compatible versions
npm update

# Update specific package to latest
npm install esbuild@latest

# Regenerate project structure documentation
npm run structure
```

## 🔄 Version Management

**Critical Rule**: Version numbers only change when you explicitly run `publish:*` commands.

### Version Strategy

| Type      | Command                 | Use Case                         | Example       |
| --------- | ----------------------- | -------------------------------- | ------------- |
| **Patch** | `npm run publish:patch` | Bug fixes, typos, minor tweaks   | 1.0.0 → 1.0.1 |
| **Minor** | `npm run publish:minor` | New features, improvements       | 1.0.0 → 1.1.0 |
| **Major** | `npm run publish:major` | Breaking changes, major rewrites | 1.0.0 → 2.0.0 |

### How Versioning Works

**Development builds (`npm run dev` or `npm run watch`):**

- ❌ Do NOT change version numbers
- ❌ Do NOT create extension.zip
- ✅ Build as many times as you want
- ✅ Version stays at 1.0.0 until you publish

**Publish commands (`npm run publish:*`):**

- ✅ Increment version in `package.json`
- ✅ Auto-sync to `public/manifest.json`
- ✅ Create production build
- ✅ Generate extension.zip

### Example Workflow

```bash
# Day 1: Start development (version 1.0.0)
npm run watch              # Build 20 times → still 1.0.0
git commit -am "Add feature"

# Day 2: Continue work (still 1.0.0)
npm run dev                # Build 15 times → still 1.0.0
git commit -am "Fix bugs"

# Day 3: Ready to publish
npm run publish:minor      # 1.0.0 → 1.1.0 + creates extension.zip
git commit -am "Release v1.1.0"
git tag v1.1.0
git push origin main --tags

# Upload extension.zip to Chrome Web Store
```

### Version Sync Mechanism

Both files stay in sync automatically:

```json
// package.json
{
  "version": "1.2.3"
}

// public/manifest.json (auto-synced)
{
  "version": "1.2.3"
}
```

This happens via the `sync-version` script:

```bash
npm run sync-version   # Copies version from package.json → manifest.json
```

### Chrome Web Store Requirements

- ⚠️ Each new upload MUST have a higher version number
- ⚠️ Cannot re-upload the same version
- ⚠️ Cannot skip versions (not required, but recommended to maintain clean history)
- ✅ Follow [Semantic Versioning](https://semver.org/) for clarity

## 🎨 Icons

You need 3 icon files in the `public/` folder:

- `icon16.png` (16x16px) - Shown in the browser toolbar
- `icon48.png` (48x48px) - Used in extension management
- `icon128.png` (128x128px) - Used in Chrome Web Store

You can:

- Create simple colored squares in any image editor
- Use a free icon from [Flaticon](https://www.flaticon.com/)
- Generate with AI (search "color palette icon")

## 🔧 Troubleshooting

### Build Issues

**"Cannot find module 'esbuild'" or "Cannot find module 'archiver'"**

```bash
# Install dependencies
npm install
```

**Build script errors or syntax issues**

```bash
# Check for typos in src/popup.js
# Look at terminal output for specific error line
# Common issues: missing semicolons, unclosed brackets
```

**"extension.zip not created"**

```bash
# ZIP only created with production builds
npm run build
# OR
npm run publish:patch
```

### Extension Loading Issues

**Extension won't load in Chrome**

- ✅ Make sure you ran `npm run dev` or `npm run watch` first
- ✅ Load the `dist/` folder, NOT the project root
- ✅ Check all 3 icon files exist in `dist/` folder
- ✅ Verify file names match exactly (case-sensitive)
- ✅ Look for errors in `chrome://extensions/` (Developer mode ON)

**"Manifest file is missing or unreadable"**

```bash
# Rebuild to regenerate dist/manifest.json
npm run dev
```

**Icons not showing**

```bash
# Check icons exist in public/ folder
ls -la public/icon*.png

# Rebuild to copy them to dist/
npm run dev
```

### Runtime Issues

**"No colors found" on Coolors.co**

- ✅ Refresh the Coolors.co page
- ✅ Make sure you're on a palette page, not homepage
- ✅ Try: `https://coolors.co/palette/264653-2a9d8f-e9c46a-f4a261-e76f51`
- ✅ Open browser console (F12) and check for JavaScript errors

**Copy to clipboard not working**

- ✅ Grant clipboard permissions when prompted
- ✅ Try closing and reopening the extension popup
- ✅ Check browser console for permission errors

**Extension works but shows old code**

```bash
# Hard refresh the extension
# Go to chrome://extensions/
# Click the refresh icon ↻ on your extension
# Or toggle the extension off and on
```

### Development Workflow Issues

**Watch mode not detecting changes**

```bash
# Stop watch (Ctrl+C) and restart
npm run watch

# Or use manual builds
npm run dev
```

**Version number not updating**

```bash
# This is expected! Use publish commands to bump version
npm run publish:patch

# To manually sync versions
npm run sync-version
```

**"extension.zip is outdated"**

```bash
# Regenerate ZIP with current code
npm run build
```

### Chrome Web Store Issues

**"Package is invalid: version already uploaded"**

```bash
# Bump version before uploading
npm run publish:patch   # or minor/major
```

**"Manifest version error"**

- ✅ We use Manifest V3 (the latest standard)
- ✅ Make sure you haven't manually edited manifest.json incorrectly
- ✅ Rebuild from clean state: `rm -rf dist && npm run dev`

**Upload rejected for policy violations**

- ✅ Check Chrome Web Store policies
- ✅ Review privacy-policy.html and terms-of-use.html
- ✅ Ensure permissions in manifest.json are justified

### Getting Help

**Still stuck?**

1. Check browser console (F12) for errors
2. Check `chrome://extensions/` for error messages
3. Run `npm run dev` and look for build errors
4. Check that your Node.js version is recent (v16+)
5. Try deleting `node_modules` and `dist`, then:
   ```bash
   npm install
   npm run dev
   ```

**Found a bug?**
Open an issue on GitHub with:

- Your Node.js version (`node --version`)
- Steps to reproduce
- Error messages
- Screenshots if relevant

## 💡 Performance

- **Color extraction**: < 5ms
- **Matching algorithm**: ~2ms for 242 colors
- **Total load time**: < 10ms
- **Memory usage**: < 5MB
- **Bundle size**: ~28KB (minified)

## 🌈 Supported Colors

All 22 Tailwind color families with 11 shades each (242 total):

- slate, gray, zinc, neutral, stone
- red, orange, amber, yellow, lime, green
- emerald, teal, cyan, sky, blue
- indigo, violet, purple, fuchsia, pink, rose

## 🧰 Tech Stack

- **Build tool**: esbuild (super fast bundling)
- **Package manager**: npm
- **Manifest version**: 3 (latest Chrome extension standard)
- **Module format**: ESM (ES Modules)

## 📝 License

MIT - Free to use and modify

## 🤝 Contributing

Found a bug or have an idea? We'd love your help!

### Quick Start for Contributors

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/charity-eng/coolors-tailwind-extension.git
   cd coolors-tailwind-extension
   ```

2. **Set up development environment**

   ```bash
   npm install
   npm run watch   # Starts auto-rebuild
   ```

3. **Load extension in Chrome**

   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

4. **Make your changes**

   - Edit files in `src/` or `public/`
   - Extension auto-rebuilds (if using watch mode)
   - Refresh extension in Chrome to see changes

5. **Test thoroughly**

   - Test on single palette pages
   - Test on trending/multiple palette pages
   - Test copy functionality
   - Test on different Coolors.co URLs

6. **Submit your contribution**
   ```bash
   git checkout -b feature/amazing-feature
   git add .
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```
   Then open a Pull Request on GitHub!

### Development Guidelines

**Code Style**

- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small
- Follow existing code patterns

**Commit Messages**

- Use clear, descriptive messages
- Start with a verb: "Add", "Fix", "Update", "Remove"
- Examples:
  - ✅ "Add support for custom color palettes"
  - ✅ "Fix clipboard copy on Firefox"
  - ❌ "changes" or "update stuff"

**Testing Checklist**

- [ ] Tested on single palette page
- [ ] Tested on trending page with multiple palettes
- [ ] Tested copy functionality
- [ ] Tested collapse/expand UI
- [ ] No console errors
- [ ] Extension icon loads correctly
- [ ] Works on fresh Chrome profile

### Areas That Need Help

- 🎨 **UI/UX improvements**: Make it even more beautiful
- 🐛 **Bug fixes**: Found something broken? Fix it!
- ⚡ **Performance**: Make it faster
- 🌐 **Browser support**: Firefox, Edge, Safari compatibility
- 📚 **Documentation**: Improve README or add tutorials
- ✨ **New features**:
  - Export to CSS variables
  - Save favorite palettes
  - Dark mode
  - Keyboard shortcuts

### Project Conventions

**File Organization**

- `src/` → All JavaScript that needs compilation
- `public/` → All static files (HTML, CSS, images)
- Never edit `dist/` directly (it's auto-generated)

**Version Bumping**

- Don't bump versions in pull requests
- Maintainers will handle version increments
- Focus on the feature/fix itself

**Dependencies**

- Only add dependencies if absolutely necessary
- Prefer vanilla JavaScript over libraries
- Keep bundle size small

### Questions?

- 💬 Open a GitHub Discussion
- 🐛 Found a bug? Open an Issue
- 💡 Have an idea? Open an Issue with "Feature Request" label

---

Made with 💜 for designers and developers

# Description

"Dumb Ways to Die in Product Development" is a fun game that mimics an old Nintendo-style dungeon-crawler RPG. The game itself is built using [Phaser 3](https://phaser.io/), which is an open-source game development framework for Canvas and WebGL powered browser games.

## Getting Started

The architecture of the codebase itself runs on NextJS for isomorphic conveniences, should they be needed at any point in the future. Getting up and running locally is simple:

```bash
$ npm install
$ npm run dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Additional Tooling

- [@headlessui/react](https://headlessui.com/) - Minimal Tailwind powered UI components, used for in-game dialogs (more notes below).
- [clsx](https://github.com/lukeed/clsx) - Styling utility for conditional classes.
- [ESLint](https://eslint.org/) - For code linting.
- [Prettier](https://prettier.io/) - For code formatting.
- [TailwindCSS](https://tailwindcss.com/) - For easy styling.
- [TypeScript](https://www.typescriptlang.org/) - For predictive typing.
- [typewriter-effect](https://github.com/tameemsafi/typewriterjs) - For typewriter-esque text rendering.
- [zustand](https://github.com/pmndrs/zustand) - Minimal state management for orchestrating game state between React and Phaser.

## Structural Overview

The NextJS project is mostly an empty shell (at least at the time of this writing). If you navigate to `/pages/index.tsx`, you'll see a dynamically loaded non-SSR component (`components/Games/Office.tsx`) that gets bootstrapped when the browser loads. This is the game itself and since it renders to Canvas within the browser, it shouldn't be pre-rendered on the server.

Phaser is a powerful framework and to work within it, there are patterns and elements of subject-matter that must be understood. These can be explored in more depth via Phaser's abundance of [learning resources](https://phaser.io/learn) and [examples](https://phaser.io/examples).

But at a high level, a Phaser game is comprised of a base configuration as well as game scenes that get rendered to the canvas. This bootstrapping takes place in `components/Games/Office.tsx` via a custom React hook called `usePhaserGame`. From there, individual scenes can be found in `scenes/Office/*`.

By default, Phaser loads the `PreloadScene` (`scenes/Office/PreloadScene.ts`). Within this "scene", assets are loaded into the browser and prepared for use. There is also a progress bar here. Once the assets are fully loaded, the `GameScene` (`scenes/Office/GameScene.ts`) is loaded. This is where the majority of interaction takes place. Likewise, one scene can trigger the loading of another scene.

_Note: `scenes/Office/BaseScene.ts` is an extended class of Phaser's default Scene class. All scenes within this game extend from it so certain DOM calculations and helper methods can be reused across different scenes._

### Phaser <> React

Phaser is completely isolated from React's DOM and state management and while this might sound like a major inconvenience, it's actually quite predictable and simple to work with.

Fortunately, with a tool like Zustand, we can tie events and state between React quite easily. The most prominent example of how this is being done is with the `ModalDialog` component (`components/Modal/ModalDialog.tsx`).This component mimics in-game prompts and sends events back to the game based on a the player's response to a prompt.

This functionality could have been accomplished entirely within the game, but making a React component for it was a deliberate decision in the interest of accessibility, particularly on smaller screens when large bodies of text might be scaled down to illegibly small.

The Zustand-powered game store can be found at `stores/gameStore.ts` and imported anywhere it's needed via:

```tsx
import gameStore from '@/stores/gameStore'
```

It can be accessed from a React component via hook:

```tsx
const { currentDialog, setCurrentDialog } = gameStore()
```

It can be accessed from a Phaser scene via helper method:

```tsx
const { currentDialog, setCurrentDialog } = gameStore.getState()
```

## Updating the Map

You might be wondering where this map and its layers are coming from. It's actually coming from an auto-generated JSON file: `public/office/world/map.json`.

This map can be updated via [Tiled](https://www.mapeditor.org/) — a desktop GUI that can read this JSON file (as well as the assets it references... so be sure not to move files around unless you're aware of the implications and how to fix relative references within Tiled).

Like Phaser, Tiled also requires some subject matter knowledge, so best to consult the [docs](https://doc.mapeditor.org/en/stable/) if you're unsure of how to make changes.

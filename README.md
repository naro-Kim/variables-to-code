# Variables to Code

Export local [Figma variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) as JSON, CSS custom properties, or a Tailwind CSS configuration.

The plugin reads the variable collections in the current Figma file, shows them in a preview table, and downloads the format you choose. It runs locally and does not make network requests.

## What it exports

| Button | Download | Purpose |
| --- | --- | --- |
| JSON | `tokens.json` | Variable collections, modes, names, IDs, and resolved values |
| CSS | `variables.css` | CSS custom properties wrapped in `@layer base` |
| Tailwind Config | `tailwind.config.js` | Tailwind theme entries that reference the generated CSS properties |

For collections with multiple modes, the first mode becomes the CSS `:root` value. Additional `light` and `dark` modes use `prefers-color-scheme`; other modes are emitted as class selectors such as `.high-contrast`.

## Prerequisites

- The Figma desktop app
- A Figma file with local variable collections
- A recent Node.js LTS release
- [pnpm](https://pnpm.io/installation)

## Install the plugin for development

1. Clone this repository and open it in a terminal.
2. Install dependencies and build the plugin:

   ```sh
   pnpm install
   pnpm build
   ```

3. In the Figma desktop app, open **Plugins → Development → Import plugin from manifest…**.
4. Select the repository's `manifest.json` file.
5. Open a Figma file, switch to Dev Mode, and run **Variables to Code** from your development plugins.

After editing the source, rebuild with `pnpm build`, or keep Webpack running while you work:

```sh
pnpm watch
```

## Use the plugin

1. Create or open local variable collections in the current Figma file.
2. Run **Variables to Code**. The plugin immediately reads the variables and displays a preview grouped by collection and mode.
3. Choose **JSON**, **CSS**, or **Tailwind Config**.
4. Move the downloaded file into your application as needed. When using the Tailwind output, include `variables.css` in the application too—the generated theme values use `var(--token-name)` references.

Variable aliases are resolved before export. Names are converted to lowercase kebab case for CSS, so a Figma variable named `Spacing/Large` becomes `--spacing-large`.

## Export behavior

- Only local variables from the current Figma file are exported.
- Colors are written as `hsl()` or `hsla()` in CSS.
- Numeric values, except zero and detected font weights, are converted to `rem` values.
- Tailwind categories are inferred from collection and variable names. Descriptive names such as `color/primary`, `spacing/md`, `font-size/body`, and `radius/lg` produce the most useful output.
- The Tailwind exporter uses the first collection mode and skips a collection named `Tokens`.
- Unrecognized variables remain available in JSON and CSS but may be omitted from the Tailwind configuration.

## Commands

```sh
pnpm build      # compile src/main.ts to dist/code.js
pnpm watch      # rebuild when source files change
pnpm lint       # check TypeScript with ESLint
pnpm lint:fix   # fix supported lint issues
```

## Project structure

```text
manifest.json       Figma plugin metadata and entry points
ui.html             Plugin interface and download handling
src/main.ts         Figma runtime entry point
src/utils/          JSON, CSS, and Tailwind exporters
dist/code.js        Compiled plugin runtime
```

## Troubleshooting

**The preview says “No variables found.”**

Confirm that the current Figma file contains local variables, then close and reopen the plugin to refresh its data.

**My latest code changes do not appear in Figma.**

Run `pnpm build` again (or leave `pnpm watch` running), then rerun the plugin.

**Some tokens are missing from the Tailwind config.**

The Tailwind exporter relies on naming hints to choose a theme category. Rename the collection or variable to include a supported concept such as `color`, `spacing`, `font-size`, `font-family`, `radius`, `border`, `shadow`, `opacity`, `z-index`, or `breakpoint`.

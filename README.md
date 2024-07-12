# rofi.link

Shorten links easily

[https://rofi.link](https://rofi.link)

## 🚀 Project Structure

This project implements colocation pattern to structure the project like this:

```text
/
├── integrations/ #custom astro integrations, should only be used in astro.config.mjs
├── public/
├── src/
│   ├── lib/
│   │   ├── components/ #shared components across pages, also use colocation patterns
│   │   │   ├── card/ #shared card component dir
│   │   │   │   ├── components/ #components those are directly rendered in the card.astro
│   │   │   │   └── card.astro #shared card component
│   │   │   └── chip.svelte #shared chip component
│   │   ├── pages/ #colocated pages modules
│   │   │   ├── dashboard/ #example of dir that categorized some pages modules
│   │   │   │   ├── lib/ #shared modules across the categorized pages (re: dashboard pages)
│   │   │   │   └── pages/ #colocated pages modules for dashboard
│   │   │   │       ├── page-a/
│   │   │   │       └── page-b/
│   │   │   └── home/ #example of standalone page modules
│   │   │       ├── components/ #colocated components those are directly rendered in the home.astro
│   │   │       ├── lib/ #shared modules across home/*
│   │   │       ├── home.astro
│   │   │       └── _script.server.ts #server side script executed in the page route level
│   │   ├── styles/ #global styles (scss/css/less files)
│   │   ├── types/ #shared type definitions
│   │   ├── utils/ #shared utility functions
│   │   ├── _document.astro #reusable document to wrap each pages
│   │   └── _script.client.ts #global client side script
│   ├── middleware/ #astro middleware
│   │   └── index.ts
│   ├── pages/ #astro page routes
│   │   └── index.astro #execute home/_script.server.ts and render home/home.astro
│   └── env.d.ts #global and Astro.locals type definitions
├── astro.config.ts
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

The global styles and the global client side script are injected through `integrations/global-injector`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## TODO List

- [] Google Auth
- [x] Copy button for the shortened URL
- [x] Tech stacks in footer

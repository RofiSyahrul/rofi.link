# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [1.0.1](https://github.com/RofiSyahrul/rofi.link/compare/v1.0.0...v1.0.1) (2024-07-20)


### Bug Fixes

* update transition persist strategy on header and footer ([1183ed3](https://github.com/RofiSyahrul/rofi.link/commit/1183ed35b71b89530ee65a7d5862280c58965ebf))


### CI Changes

* **vercel:** install and use pnpm ([e9dfaec](https://github.com/RofiSyahrul/rofi.link/commit/e9dfaec592b718311f1bc313e0de40fe81a868fb))

## 1.0.0 (2024-07-19)


### ⚠ BREAKING CHANGES

* **BREAKING CHANGE:** - Replace Nextjs with Astro
- Replace React with Svelte
- Replace Supabase with Prisma & Postgres

### Features

* add api helpers ([4727fad](https://github.com/RofiSyahrul/rofi.link/commit/4727fad63f23edcb5881d65d7c518696d578c6da))
* add AppHeadContent ([f6088ce](https://github.com/RofiSyahrul/rofi.link/commit/f6088ce5dea7dffaeede6052d3b1b801938ca6f2))
* add check, close, exclamation and info icons ([4b417cf](https://github.com/RofiSyahrul/rofi.link/commit/4b417cf36892051a97d350ac0d0b47d360920333))
* add common helpers ([adbf10a](https://github.com/RofiSyahrul/rofi.link/commit/adbf10aa078778e7fb89c764eeb1e69db8bf5a4c))
* add constants ([939fe8d](https://github.com/RofiSyahrul/rofi.link/commit/939fe8d6e9c0543496261ea91d245f333fbea66d))
* add essential meta tags ([016e86b](https://github.com/RofiSyahrul/rofi.link/commit/016e86bbde918cd2dac8afb5efa6bf436218d133))
* add footer to layout ([8a4e5a7](https://github.com/RofiSyahrul/rofi.link/commit/8a4e5a7dcc151265c3a4d1b81f5de337cd702728))
* add icons of tools used in this project ([52738cf](https://github.com/RofiSyahrul/rofi.link/commit/52738cfa389739af148c4bf5a1b0a1c9a4b8df45))
* add link to homepage on dashboard placeholder page ([8ccb18a](https://github.com/RofiSyahrul/rofi.link/commit/8ccb18a0e6a75a149fdc4ac05427aad38caa55b5))
* add login with google button ([a7895c4](https://github.com/RofiSyahrul/rofi.link/commit/a7895c407329b1e0f9d41885a2d225f888778295))
* add noIndex prop to Meta component ([379af54](https://github.com/RofiSyahrul/rofi.link/commit/379af54a77997fb9e4454b221d1afbb84f5879a1))
* add placeholder for dashboard page ([fee70e2](https://github.com/RofiSyahrul/rofi.link/commit/fee70e204a2f64a86f65b2557bca803782bc8c9c))
* add schema markup in homepage ([49e4927](https://github.com/RofiSyahrul/rofi.link/commit/49e492793001407ceecaf64f68b29141a3e64025))
* add success and error handler after shortening a URL ([5562ad0](https://github.com/RofiSyahrul/rofi.link/commit/5562ad0a28beacae7df4d40d6e52640f5a751fe7))
* add url model types ([8e50155](https://github.com/RofiSyahrul/rofi.link/commit/8e5015516603eff3bc57f1824f506901b27584a0))
* **BREAKING CHANGE:** migrate to astro, svelte and prisma ([a51d441](https://github.com/RofiSyahrul/rofi.link/commit/a51d441806a74dd4428e7661a1b2003aa0fb453a))
* change default image URL ([a40ff5e](https://github.com/RofiSyahrul/rofi.link/commit/a40ff5e3113959a170a0f676fb513f85fd95bf69))
* create /api/url API route ([8eba89c](https://github.com/RofiSyahrul/rofi.link/commit/8eba89c884ca0223e52aa37e808f9c55f2a198e3))
* create api services for fetching data ([9cb80aa](https://github.com/RofiSyahrul/rofi.link/commit/9cb80aac44e09ea76aef31630ac6570f7b5f2e7e))
* create auth context ([998dde2](https://github.com/RofiSyahrul/rofi.link/commit/998dde26b2abbe9d42b4ad89f380079c92afba10))
* create color-mode context ([2d983b5](https://github.com/RofiSyahrul/rofi.link/commit/2d983b58e659e60ca7a48454b609217a059a63ab))
* create dynamic page to catch any slugs ([eb89e7e](https://github.com/RofiSyahrul/rofi.link/commit/eb89e7eb887896b038f1dde74168ba321e8e86b1))
* create Error page ([69b21c8](https://github.com/RofiSyahrul/rofi.link/commit/69b21c81501657fd1acf54926c9df34555893ab0))
* create firebase services for server ([6a45256](https://github.com/RofiSyahrul/rofi.link/commit/6a452567d2f03afe7d17f9f0f215fa7087854afd))
* create Layout component and integrate it to homepage ([c57f577](https://github.com/RofiSyahrul/rofi.link/commit/c57f577b5cd9774ec7f2fcc6139984eae34e25bc))
* create ShortenerForm and integrate it to Homepage ([4937d90](https://github.com/RofiSyahrul/rofi.link/commit/4937d9069a77314e8f3ab901950354576b7f7dac))
* enable i18n with indonesian and english languages ([#7](https://github.com/RofiSyahrul/rofi.link/issues/7)) ([5e5351a](https://github.com/RofiSyahrul/rofi.link/commit/5e5351ad5ba115c1a0aeb1cf3c009c59a87b0bb1))
* extend tailwind global style ([01b4df8](https://github.com/RofiSyahrul/rofi.link/commit/01b4df8dbcd621eb90dae3f80387ede6aa9c3b63))
* initial commit ([dc5fa7d](https://github.com/RofiSyahrul/rofi.link/commit/dc5fa7dbeaf2a45043f64ca707d871711e258350))
* initial commit from Create Next App ([5e8d912](https://github.com/RofiSyahrul/rofi.link/commit/5e8d9124148f272433ac339fb56c68a843c46dba))
* initiate icon components ([aabcb33](https://github.com/RofiSyahrul/rofi.link/commit/aabcb332e8fa2802ca17d6be37aa2672f0fe42a9))
* integrate color-mode context to the app ([a7cba15](https://github.com/RofiSyahrul/rofi.link/commit/a7cba15b95dcd34e5e7d843cdff21b328857ecd5))
* integrate switch mode button with homepage ([c57e465](https://github.com/RofiSyahrul/rofi.link/commit/c57e465228a844712f05d865f62201c3190c8cbe))
* integrate with firebase auth ([c001f27](https://github.com/RofiSyahrul/rofi.link/commit/c001f2705b9149db5d6557d764af692b7c8283d9))
* new Alert component ([37a6db7](https://github.com/RofiSyahrul/rofi.link/commit/37a6db784ee76c3d76d22607675b4d41b776e5ff))
* new Anchor component ([840e29d](https://github.com/RofiSyahrul/rofi.link/commit/840e29dd3ec3691960e4018365ab33f956b9936f))
* new Button and Spinner components ([2015fd1](https://github.com/RofiSyahrul/rofi.link/commit/2015fd1d32286271519cae2d6be192a3b46b7688))
* new Input component ([bb2870f](https://github.com/RofiSyahrul/rofi.link/commit/bb2870fa10caaf5b082203eba58a446c76c9ae40))
* new SwitchModeButton component ([cdf310a](https://github.com/RofiSyahrul/rofi.link/commit/cdf310a5c2545a5eceece0803dd129457f6c2cc9))
* new VisuallyHidden component ([fd09cd5](https://github.com/RofiSyahrul/rofi.link/commit/fd09cd5b4ee04365425509984798df56821e218b))
* restrict shorten new url using existing path ([3001c90](https://github.com/RofiSyahrul/rofi.link/commit/3001c90010d97763705becb5d8f43fd9c2344fe7))


### Bug Fixes

* button class names are not available on production mode ([fe143fe](https://github.com/RofiSyahrul/rofi.link/commit/fe143fe5b1d86469e6bafcbfc0fea616d190622e))
* connect shortened URL to the current user ([61ea443](https://github.com/RofiSyahrul/rofi.link/commit/61ea44367d70e85af3be99d36bb3415aee99b580))
* error on get user due to unavailable access token ([18fcc20](https://github.com/RofiSyahrul/rofi.link/commit/18fcc20899f4ad97106ceb51bf9d06198e369893))
* hydration error ([0d55587](https://github.com/RofiSyahrul/rofi.link/commit/0d55587acaab87a462431cf3c1bf62504f582d74))
* incorrect style for svg icons ([0c56431](https://github.com/RofiSyahrul/rofi.link/commit/0c564313d3adb174fc13e892cc030d7fae42df16))
* layout header styling ([5b59e56](https://github.com/RofiSyahrul/rofi.link/commit/5b59e562a475accc3ff41d7ee30c26a6de40a456))
* pwa bad precaching response ([ca5796c](https://github.com/RofiSyahrul/rofi.link/commit/ca5796c8e938527b6bab4eb8d38d5eb6a8c9890c))
* shorten new url for guest user ([82dde64](https://github.com/RofiSyahrul/rofi.link/commit/82dde64fef36ec2e64838e959f05328b55ae9664))
* toggle color mode action return 500 ([01eb8be](https://github.com/RofiSyahrul/rofi.link/commit/01eb8beb529002d0a171166fdea9200accd53f19))
* wrong slug input validation ([19886f0](https://github.com/RofiSyahrul/rofi.link/commit/19886f03da9023953e48d7a2613e8d978d719d79))


### Improvements

* change color theme and restructure styling system ([327e8ec](https://github.com/RofiSyahrul/rofi.link/commit/327e8ecf156e1031da86e7e9905c6bb150d4bf02))
* implement @typescript-eslint/consistent-type-imports eslint rule ([772feb2](https://github.com/RofiSyahrul/rofi.link/commit/772feb24e57b785eda8195618e27be8faf405ff2))
* implement tailwind layer and custom color theme ([3c16a72](https://github.com/RofiSyahrul/rofi.link/commit/3c16a724d0e858c82bb705097c4679d8de608dbf))
* migrate from firebase to supabase ([736fe9f](https://github.com/RofiSyahrul/rofi.link/commit/736fe9f546f97eb74fd4aa8269a94e39f7793d02))
* move callback route to /p/callback ([e3c78c8](https://github.com/RofiSyahrul/rofi.link/commit/e3c78c8464052f0bc6902e46255e949755c81cea))
* move out auth section from Layout to be standalone reusable component ([9f26b31](https://github.com/RofiSyahrul/rofi.link/commit/9f26b31efe2e104bcccfa911e11ec5537304b459))
* remove GET handler for /api/url route ([bf8b020](https://github.com/RofiSyahrul/rofi.link/commit/bf8b0203027c2c28ac0c8100163f5ad391ef0cc4))
* update code style and editor configurations ([619e1b5](https://github.com/RofiSyahrul/rofi.link/commit/619e1b56637d101a11a376d31191b45054b58e21))
* update error page style and copywriting ([f5c46ec](https://github.com/RofiSyahrul/rofi.link/commit/f5c46ecdac20e93ee386d6f5d8851554857b10be))
* update import statement based on new lint rule ([08daa01](https://github.com/RofiSyahrul/rofi.link/commit/08daa01aaa5c4de55b38c4d4df8c5b0e2f5ac9eb))
* update layout height ([39cd3cf](https://github.com/RofiSyahrul/rofi.link/commit/39cd3cf1d908d4a8475bb428c7c751caffa2f4a3))
* use APP_NAME from package.json, add and use author field ([2d15bac](https://github.com/RofiSyahrul/rofi.link/commit/2d15bac288e7b3bdc901b6bae7c0ffc25bfd69ce))


### Docs

* update README ([3fb8ca0](https://github.com/RofiSyahrul/rofi.link/commit/3fb8ca062f66018e55a94023c36e6ec8856e8012))

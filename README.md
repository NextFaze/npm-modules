# NextFaze `npm` Toolkit

<img src="https://res.cloudinary.com/teepublic/image/private/s--tKrGPgYa--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_262c3a,e_outline:48/co_262c3a,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1489697662/production/designs/1330117_1.jpg" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="250" height="250"/>

## Demo Application

`packages/angular-example-app` Contains a simple demo angular app showcasing the various modules. It is by no means a 'best practices' demo app - use the Angular seed for that. It contains Angular material, a simple `@ngrx/store` with effects, and the seed loopback sdk.

## Lerna

[Lerna](https://github.com/lerna/lerna) is used for publishing all the packages as separate npm packages in nexus.

If you want to run lerna locally `npm i -g lerna`.
Most common learna tasks are in the package file and lerna is a dependency so you can usually substitute lerna commands for `npm run` commands if you do not want to install lerna locally e.g. `npm run bootstrap` = `lerna bootstrap`, `npm test` = `lerna run test` etc.

## Creating a Package

1. Grab the [npm module seed](https://gitlab.nextfaze.com/nextfaze/npm-module-seed) as a starting point (make a shallow clone and get it setup for your own module - e.g. add dependencies you need)
2. Setup the module's package file to be appropriate for your new module (change the `'name'` to `'@nextfaze/{my-dank-package}'` and update description)
3. Checkout this repo and add your new module to the `packages` folder under a folder name for the module `packages/{my-dank-package}`.
4. Create a new branch and commit (`feature/{my-dank-package}`), push to gitlab.
5. Work on your module until it is ready to become part of the NextFaze toolkit - at which point, make a PR into master
6. Any changes you make should be on a new feature/fix branch, preferably tagged with the module name and a gitlab issue. Commits should also reference a gitlab issue so we know who is working on what

## Some notes about npm module dev

* Don't worry about `CHANGELOG.md` - Lerna will take care of that for you as long as you write _good commit messages_ (see the Commits section)
* Keep your README _up to date_ and _document everything_.
  * I recommend getting the [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis) visual studio code extension to make generating your jsdoc a lot easier
  * Don't write a book in the docs - noone is going to read it. Just a simple one-liner about what the thing does is enough. This file is an exception - those who can't teach.
  * Don't use `any` in your type annotations unless you really mean it. TypeScript offers more than just decorators - it lets other devs know how to use your tools.
  * Look at `@nextfaze/core-tools` for an example of what is expected in terms of docs and test coverage.
* Be very wary of what you commit and what is in `.npmignore`. `.gitignore` and `.npmignore` are mutually exclusive - having a `.npmignore` will make npm ignore your `.gitignore`
* Be conscious of what is a dev and what is a regular dependency. Anything that is a dependency will be installed as a dependency of modules that depend on you. Don't make other developers take on your needless dependencies.
* Don't re-invent the wheel. Feel free to depend on other tools in the `@nextfaze` toolkit

## Bootstrap

Lerna boot strap will install all dependencies of all packages and setup symlinks for dependencies within the repo

`npm run bootstrap:hoist` or `lerna bootstrap --hoist`

The `--hoist` flag ensures that all the shared dependencies are brought to the root application level. This is particularly important for Angular's dependency injection.

## Running the sample app

Run `npm run serve:angular` in the root or cd into `packages/angular-example-app` and run `npm start`

## Commits

Please read:

https://conventionalcommits.org/

https://chris.beams.io/posts/git-commit/

Lerna uses conventional commits to determine the package number. It will be a patch unless you include `feat:` or `BREAKING CHANGE:` in front of one of the commit messages.

* `<message>` (a normal ommit message) will publish a patch version (0.0.x)
* `feat: <message>` will publish a minor version (0.x.0)
* `BREAKING CHANGE` at the beginning of the optional body or footer section will publish a major bersion (x.0.0)

Please be aware that ther may be many client projects that use your module so pay close attention to what is a fix, a feature and a breaking change.

In general:

* Minor bug fix: patch
* New code added: minor
* Removed code or refactored: major
* If you're going to commit `'testing blah blah` on your new feature branch - make sure you squash it out _before_ making a PR

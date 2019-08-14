# Build Tools

## Angular Packages

NextFaze Angular `npm-module` packages offer two bundle types - UMD and AOT.

### UMD

Two [UMD bundles](https://github.com/umdjs/umd) are build. One a regular UMD, and the second minified and uglified.
UMD bundles contain the component inlined compiled SCSS and HTML and are ready to be used in the client/browser/server.
Here webpack is used to build these UMD bundles.

#### Webpack

The following [webpack loaders](https://webpack.js.org/loaders/) are neccesary to convert angular projects into an importable UMD bundle library.

#### awesome-typescript-loader

[awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader) runs over the typescript files first and converts them to javascript.

##### angular2-template-loader

The [angular2-template-loader](https://www.npmjs.com/package/angular2-template-loader) webpack plugin is used to `require(<path>)` the `templateUrl` and `styleUrls`. This is neccesary as the format of importing a file like `templateUrl: <path>` or with `styleUrls` is specific to angular and not understood by webpack.

**Before**

`templateUrl: './data-table.component.html'`

**After**

`templateUrl: require('./data-table.component.html')`

Now when the next webpack loaders run, they can pick up the included HTML/SCSS file from the `require` function.

#### to-string-loader

This project uses [to-string-loader](https://www.npmjs.com/package/to-string-loader) to inline the `require('./my-stylesheet.scss')` (generated created from angular2-template-loader).

### AOT

The second type of dist files is AOT ready and contains the respective Typescript declaration (.d.ts) for all files and maintains the original folder structure.
Gulp is used to inline the SCSS and HTML and build to a `./tmp` directory.
This is neccesary as NGC does not understand SCSS, so by turning it into regular CSS and inlining it, it can be properly parsed in for NGC to create the [angular `.metadata.json` files](https://angular.io/guide/aot-compiler).

'use strict';
/* eslint-env node */

//@ts-check
const Plugin = require('broccoli-caching-writer');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
const sass = require('sass');


module.exports = class SassCompiler extends Plugin {
  constructor(inputTrees, inputFile, outputFile, options) {
    super(inputTrees, { ...options, persistentOutput: true });
    this.inputFile = inputFile;
    this.outputFile = outputFile;
    this.options = options;
    this._previous = [];
  }

  build() {
    var destFile = path.join(this.outputPath, this.outputFile)
    mkdirp.sync(path.dirname(destFile))

    var sassOptions = {
      file: path.join(this.inputPaths[0], this.inputFile),
      includePaths: this.inputPaths,

      imagePath: this.options.imagePath,
      outputStyle: this.options.outputStyle,
      precision: this.options.precision,
      sourceComments: this.options.sourceComments,
    }

    const result = sass.renderSync(sassOptions)
    fs.writeFileSync(destFile, result.css)

  }
}
let less;

let initialized = false;

const { require: requireFromAppRoot } = require('app-root-path');

function init() {
  less = requireFromAppRoot('./node_modules/less');
  if (!less.renderSync) {
    less.renderSync = function (input, options) {
        if (!options || typeof options != "object") options = {};
        options.sync = true;
        var css;
        this.render(input, options, function (err, result) {
            if (err) throw err;
            css = result.css;
        });
        return css;
    };
  }
  initialized = true;
}

function transform(content, options) {
  if (!initialized) {
    init();
  }

  if (less) {
    return less.renderSync(content, options);
  } else {
    throw new Error(
      `failed to load less! please add less as a dependency.`
    );
  }
}

module.exports = transform;

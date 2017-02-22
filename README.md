# @giodamelio/eslint-config-thehelpining

My personal ESLint config. This is really just a thin wrapper around [@scottnonnenberg/eslint-config-thehelp](https://github.com/scottnonnenberg/eslint-config-thehelp) with some tweaks to make it fit my style.

## Install

``` shell
npm install --save-dev @giodamelio/eslint-config-thehelpining
# or
yarn add --dev @giodamelio/eslint-config-thehelpining
```

To auto generate configuration files (`.eslintrc.js`) and npm scripts run:

TODO: Create this script
``` shell
node ./node_modules/@giodamelio/eslint-config-thehelpining/generate_configs.js
```

## Presets

1. `@giodamelio/thehelpining`: Default config. Includes `core`, `es2015` and `functional`.
2. `@giodamelio/thehelpining/core`: Basic best practices. [@scottnonnenberg/thehelp/core][thehelp-configs] with a few tweaks.
3. `@giodamelio/thehelpining/es2015`: Prefer ES2015 constructs when possable. [@scottnonnenberg/thehelp/es2015][thehelp-configs] with a few tweaks.
4. `@giodamelio/thehelpining/functional`: Dissallow all loops and mutation. [@scottnonnenberg/thehelp/functional][thehelp-configs] with a few tweaks.
5. `@giodamelio/thehelpining/test`: Rules for your `test/` directory. [@scottnonnenberg/thehelp/test][thehelp-configs] with a few tweaks.
6. `@giodamelio/thehelpining/scripts`: Rules for your `scripts/` directory. [@scottnonnenberg/thehelp/scripts][thehelp-configs] with a few tweaks.

### Environment specific presets

The presets contain some rules for use with specific environments.

1. `@giodamelio/thehelpining/react`: Rules for React component structure and JSX formatting. [@scottnonnenberg/thehelp/react][thehelp-configs] with a few tweaks.
2. `@giodamelio/thehelpining/node`: Rules for Node.js.

## Thanks

**HUGE** thanks to [Scott Nonnenberg](https://github.com/scottnonnenberg) for all his work on [eslint-config-thehelp](https://github.com/scottnonnenberg/eslint-config-thehelp), he did most of the hard work.

[thehelp-configs]: https://github.com/scottnonnenberg/eslint-config-thehelp#configurations-in-this-project

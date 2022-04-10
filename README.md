# Problem Statement

When app is running in **production** mode, the bundle that it carries with it is actually uglified or minified and the errors that are encountered during that time are unreadable. Obvious solution to that is using **source-maps**. But that is exposing our source code to the outside world.

Need to find a solution where source-maps are available only for certain groups of people.

# Solution

We can tell webpack to generate source-maps using the **devtool** option.

Environment variables can be passed to webpack CLI using `--env` option. And then we can have a check in place -

![webpack devtool config](https://github.com/SandyDev00076/webpack-react-sourcemaps/blob/env-solution/webpackDevtoolConfig.png)

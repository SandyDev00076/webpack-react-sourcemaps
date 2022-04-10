# Problem Statement

When app is running in **production** mode, the bundle that it carries with it is actually uglified or minified and the errors that are encountered during that time are unreadable. Obvious solution to that is using **source-maps**. But that is exposing our source code to the outside world.

Need to find a solution where source-maps are available only for certain groups of people.

# Solution

Rather than just using the **devtool** option of webpack to generate source-maps on the basis of an environment variable, we can do the following steps -

1. Create a **CI Server** which uploads the source-map as **artifacts**.
2. Create your own local server which -
   a. Listens to the request made by browser dev tools, when source-maps are needed.
   b. Upon request, **fetches the source-maps** from the CI server mentioned in point 1.

**How does dev tools know where to find the source-map for the particular file ?**
A line is appended to the file which is a pragma indicating the location to fetch the source-map from - `//# sourceMappingURL=\<LOCATION\>`

**How do we change this LOCATION to point to our local server which will fetch the source-map ?**
There is a plugin included in webpack - **SourceMapDevToolPlugin** which enables more fine grained control of _source map generation_. There you can provide a configuration like this -


![webpack source map dev tool plugin config](https://github.com/SandyDev00076/webpack-react-sourcemaps/blob/main/webpackSourceMapPluginConfig.png)

So now, every time browser open the bundle, and dev tools have been opened, a request will be made to `localhost:5050/<file-name>`.

## Local server

In my case, I am using GitHub Actions to create my workflow and artifacts. Hence in my local server, I did following steps -

1. Fetch the artifact details from GitHub API using Personal Access Token using **node-fetch**.
2. We receive a link to the compressed resources of the artifact - `archive_download_url`.
3. Download the zip file using **download** npm package.
4. Upon request from dev tools, extract the contents of the zip file (using **node-stream-zip** npm package) and sending back the source map for the file specified in the request.
5. Source-map is received from the browser and it works.

## Advantages of having a local server

1. We can only allow whitelisted IPs to fetch the source-maps.
2. We can add more layers of protection according to our need.

## Alternatives to CI Server

An s3 bucket can also be used in place of CI server and white listing of IPs can be done from the s3 dashboard as well.

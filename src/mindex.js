const Sentry = require("@sentry/node");
// increase limit to more than 10 entries in stack
Error.stackTraceLimit = Infinity;

//const path = require("path");

Sentry.init({
  dsn: process.env.DSN,
  // webpack.config.js:
  // if mode: production -  Uglify needs to be disabled for sourcmap to create valid line numbers
  //   optimization: {
  //     minimizer: [],
  //   },
  beforeSend(event, hint) {
    const exception = event.exception;

    if (exception) {
      try {
        const { basename, relative } = require("@sentry/utils/path");
        // without this setting __dirname will be "/"
        // https://github.com/webpack/webpack/issues/1599
        // webpack.config.js:
        // node: {
        //     __dirname: true,
        //   },
        // needs to be the folder where the current main.js is running
        const root = __dirname + "/";
        console.log("root: ", root);
        const frames = exception.values[0].stacktrace.frames;
        frames.forEach(frame => {
          if (frame.filename && frame.filename.startsWith("/")) {
            //console.log('filename:', frame.filename)
            const base = root
              ? relative(root, frame.filename)
              : basename(frame.filename);
            frame.filename = `app:///${base}`;
            console.log("filename changed:", frame.filename);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    return event;
  },
  // does not exist in current version on npm - but would replace "beforeSend()"
  // monorepo - no way to yarn add github version
  //integrations: [new Sentry.Integrations.RewriteFrames()],
  release: process.env.SVERSION // 'release009'
});

function a() {
  console.log("Release: ", process.env.SVERSION);
  a = b / 0; // create an error
}
a();

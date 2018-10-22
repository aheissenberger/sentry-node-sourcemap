#!/bin/sh

sentry-cli releases new "$SVERSION"
sentry-cli releases finalize "$SVERSION"
sentry-cli releases files $SVERSION upload-sourcemaps ./dist --validate --ignore-file .sentryignore --rewrite --url-prefix '~/'
sentry-cli releases files $SVERSION list
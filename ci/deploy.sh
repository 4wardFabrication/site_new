#!/bin/bash

HEROKU_APP=$1
NODE_ENV=$2
heroku apps | grep "^$HEROKU_APP\b" || heroku create --no-remote "$HEROKU_APP" --stack 'cedar'
heroku config:set "NODE_ENV=$NODE_ENV" --app "$HEROKU_APP"
git init .
git add --all
git commit -m "Site update at $(date '+%d/%m/%Y %H:%M:%S')"
git push --force "git@heroku.com:$HEROKU_APP.git" 'master:master'

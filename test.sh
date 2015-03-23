#!/bin/bash

node_modules/.bin/jshint app/ test/
node_modules/.bin/nodeunit test/
node_modules/karma/bin/karma start

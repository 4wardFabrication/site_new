#!/bin/bash

node_modules/.bin/jshint app/ test/
node_modules/.bin/nodeunit test/

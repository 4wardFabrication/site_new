#!/bin/bash

node_modules/.bin/jshint app/
node_modules/.bin/nodeunit test/

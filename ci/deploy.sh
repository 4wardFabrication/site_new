#!/bin/bash
APP=$1
NODE_ENV=$2
STACK='cedar'

function verify_or_create_app() {
  local _APP=$1
  local _STACK=$2
  heroku apps | grep "^$_APP\b" || heroku create --no-remote "$_APP" --stack "$_STACK"
}

function set_node_env() {
  local _APP=$1
  local _NODE_ENV=$2
  heroku config:set "NODE_ENV=$_NODE_ENV" --app "$_APP"
}

function deploy_to_heroku() {
  local _APP=$1
  git init .
  git add --all
  git commit -m "Site update at $(date '+%d/%m/%Y %H:%M:%S')"
  git push --force "git@heroku.com:$_APP.git" 'master:master'
}

verify_or_create_app $APP $STACK
set_node_env $APP $NODE_ENV
deploy_to_heroku $APP

#!/bin/bash

rm -rf ./dist/static/configuration.json
rm -rf ../phoenixzqy.github.io/index.html
rm -rf ../phoenixzqy.github.io/static/css 
rm -rf ../phoenixzqy.github.io/static/fonts 
rm -rf ../phoenixzqy.github.io/static/img 
rm -rf ../phoenixzqy.github.io/static/js
cp ./dist/index.html ../phoenixzqy.github.io/
cp -rf ./dist/static/* ../phoenixzqy.github.io/static/
rm -rf ./dist

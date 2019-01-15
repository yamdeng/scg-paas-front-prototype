#!/bin/sh

# alias /Users/user/Project/scg-paas-front-prototype/build.sh

cd /Users/user/Project/scg-paas-front-prototype
yarn build
echo "build success"
sleep 1
cp -rf ./build/* ../scg-paas-server-prototype/public
sleep 1
echo "copy success"
exit 0

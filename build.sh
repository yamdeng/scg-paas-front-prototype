#!/bin/sh

# alias /Users/user/Project/scg-paas-front-prototype/build.sh

cd ~/Project/scg-paas-server-prototype/public
rm -rf `ls | find . -name image -prune -o -print`
echo "server public remove success"
cd ~/Project/scg-paas-front-prototype
yarn build:dev
# yarn build
echo "build success"
sleep 1
cp -rf ./build/* ../scg-paas-server-prototype/public
# sleep 1
# cp -rf ./build/* ../scg-paas-server-prototype/public/test
sleep 1
echo "copy success"
exit 0

#!/bin/sh

if [ -f "./server/.env" ]
then
    echo "Project already initialized... exiting"
    exit;
fi

echo "Initialzing project..."

# prisma
echo "Setting up prisma"
cd .install
yarn
yarn install

# Server
echo "Setting up server"
cd ../server/
yarn
yarn prisma deploy

# App
echo "Setting up app"
cd ../app/
yarn

echo "Done!"


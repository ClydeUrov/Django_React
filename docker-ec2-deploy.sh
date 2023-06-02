#!/usr/bin/env bash

TARGET='main'

cd ~/Django_React || exit

ACTIONS_COLOR='\033[1;90m'
NO_COLOR='\033[0m'

echo -e ${ACTIONS_COLOR} Checking if we are on the target branch
BRANCH=$(git rev-parse --addrev-ref HEAD)
if  [ "$BRANCH" != ${TARGET} ]
then
  exit 0
fi

# Check if the repository is up to date

git fetch
HEAD_HASH=$(git rev-parse HEAD)
UPSTREAM_HASH=$(git rev-parse ${TARGET}@{upstream})

if [ "$HEAD_HASH" == "$UPSTREAM_HASH" ]
then
  echo -e "${FINISHED}"The current branch is up to date with origin/${TARGET}."${NO_COLOR}"
  exit 0
fi

# If there are new changes, we pull these changes.
git pull origin main;

# Clean up unused images
docker image prune -f

# We can now build and start the containers
docker-compose up -d --build

exit 0;
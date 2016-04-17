#!/bin/bash
TWENTYFOUR_SRC_DIR=${HOME}/code/twentyfour
GITHUB_PAGES_SRC_DIR=${HOME}/code/24game.github.io

if [ ! -d "$TWENTYFOUR_SRC_DIR" ]; then
  # Directory doesn't exist
  [[ `id -u` -eq 0 ]] || { echo "Expected twentyfour code directory at ${TWENTYFOUR_SRC_DIR} but it doesn't exist. Please adjust the path to your twentyfour source directory in this script."; exit 1; }
fi

if [ ! -d "$GITHUB_PAGES_SRC_DIR" ]; then
  # Directory doesn't exist
  [[ `id -u` -eq 0 ]] || { echo "Expected 24game.github.io code directory at ${GITHUB_PAGES_SRC_DIR} but it doesn't exist. Please adjust the path to your 24game.github.io source directory in this script."; exit 1; }
fi

echo "Copying ${TWENTYFOUR_SRC_DIR}/public to ${GITHUB_PAGES_SRC_DIR}..."
cp -af ${TWENTYFOUR_SRC_DIR}/public/. ${GITHUB_PAGES_SRC_DIR}

# Get last commit info
echo "Pulling last commit info from origin/master..."
cd ${TWENTYFOUR_SRC_DIR}
COMMIT_HASH=$(git rev-parse --short origin/master)
COMMIT_MESSAGE=$(git log -1 --pretty=format:%s origin/master)

# Deploy to GitHub pages to trigger a page rebuild
cd ${GITHUB_PAGES_SRC_DIR}
git add .
git commit -m "[Deploy] ${COMMIT_HASH}: ${COMMIT_MESSAGE}"
echo "Deploying ${COMMIT_HASH} ${COMMIT_MESSAGE}..."
git push origin master --force
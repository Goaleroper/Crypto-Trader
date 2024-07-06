#!/bin/sh

if [ -z "$1" ]; then
  echo "No version bump type provided. Please provide 'patch', 'minor', or 'major' as an argument."
  exit 1
fi

VERSION_BUMP_TYPE=$1

CURRENT_VERSION=$(node -p "require('./package.json').version")
NEXT_VERSION=$(npm --no-git-tag-version version $VERSION_BUMP_TYPE --json | node -p "JSON.parse(process.stdin.read()).version")
TAG_EXISTS=$(git tag -l "v$NEXT_VERSION")

if [ -z "$TAG_EXISTS" ]; then
  echo "Bumping version from $CURRENT_VERSION to $NEXT_VERSION"
  npm version $VERSION_BUMP_TYPE --no-git-tag-version
  git add package.json
  git commit -m "Bump version to $NEXT_VERSION"
  git tag "v$NEXT_VERSION"
  git push origin master --tags
else
  echo "Tag v$NEXT_VERSION already exists. Skipping version bump."
  # Revert the version change in package.json
  npm version $CURRENT_VERSION --no-git-tag-version --allow-same-version
fi

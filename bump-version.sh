#!/bin/sh

if [ -z "$VERSION_BUMP_TYPE" ]; then
  echo "No version bump type provided. Please set 'VERSION_BUMP_TYPE' to 'patch', 'minor', or 'major'."
  exit 1
fi

CURRENT_VERSION=$(node -p "require('./package.json').version")
TAG_EXISTS=$(git tag -l "v$CURRENT_VERSION")

if [ -z "$TAG_EXISTS" ]; then
  echo "Bumping version with type: $VERSION_BUMP_TYPE"
  npm version $VERSION_BUMP_TYPE
else
  echo "Tag v$CURRENT_VERSION already exists. Skipping version bump."
fi

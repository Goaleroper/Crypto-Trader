#!/bin/sh

if [ -z "$1" ]; then
  echo "No version bump type provided. Please provide 'patch', 'minor', or 'major' as an argument."
  exit 1
fi

VERSION_BUMP_TYPE=$1

CURRENT_VERSION=$(node -p "require('./package.json').version")
TAG_EXISTS=$(git tag -l "v$CURRENT_VERSION")

if [ -z "$TAG_EXISTS" ]; then
  echo "Bumping version with type: $VERSION_BUMP_TYPE"
  npm version $VERSION_BUMP_TYPE
  git push --tags origin master
# else
#   echo "Tag v$CURRENT_VERSION already exists. Bumping to the next available version."
#   npm version patch  # Example: Always bumping to the next patch version
fi

# if [ -z "$1" ]; then
#   echo "No version bump type provided. Please provide 'patch', 'minor', or 'major' as an argument."
#   exit 1
# fi

# VERSION_BUMP_TYPE=$1

# # Bump the version and check the new version
# NEW_VERSION=$(npm version $VERSION_BUMP_TYPE)
# TAG_EXISTS=$(git tag -l "v$NEW_VERSION")

# if [ -z "$TAG_EXISTS" ]; then
#   echo "Bumping version to $NEW_VERSION"
# else
#   echo "Tag v$NEW_VERSION already exists. Skipping version bump."
#   exit 0
# fi


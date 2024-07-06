#!/bin/sh

# Check if a version bump type is provided
if [ -z "$1" ]; then
  echo "No version bump type provided. Please provide 'patch', 'minor', or 'major' as an argument."
  exit 1
fi

VERSION_BUMP_TYPE=$1

# Get the current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Bump the version using npm, without creating a Git tag
NEXT_VERSION=$(npm version $VERSION_BUMP_TYPE --no-git-tag-version | sed 's/v//')

# Check if the new version tag already exists
TAG_EXISTS=$(git tag -l "v$NEXT_VERSION")

if [ -z "$TAG_EXISTS" ]; then
  echo "Bumping version from $CURRENT_VERSION to $NEXT_VERSION"
  # Commit the version bump
  git add package.json
  git commit -m "Bump version to $NEXT_VERSION"
  # Create the new version tag
  git tag "v$NEXT_VERSION"
  echo "Version bumped to $NEXT_VERSION"
  exit 0
else
  echo "Tag v$NEXT_VERSION already exists. Skipping version bump."
  # Revert the version change in package.json
  npm version $CURRENT_VERSION --no-git-tag-version --allow-same-version
  echo "Version remains at $CURRENT_VERSION"
  exit 1
fi

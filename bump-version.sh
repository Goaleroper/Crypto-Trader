#!/bin/sh
if [ -z "$1" ]; then
  echo "No version bump type provided. Using 'minor' as default."
  VERSION_BUMP_TYPE="patch"
else
  VERSION_BUMP_TYPE=$1
fi

echo "Bumping version with type: $VERSION_BUMP_TYPE"
npm version $VERSION_BUMP_TYPE --no-git-tag-version
git add package.json
git commit -m "Bump version to $(node -p "require('./package.json').version")"
git push --follow-tags origin master`


# if [ -z "$1" ]; then
#   echo "No version bump type provided. Please provide 'patch', 'minor', or 'major' as an argument."
#   exit 1
# fi

# VERSION_BUMP_TYPE=$1

# CURRENT_VERSION=$(node -p "require('./package.json').version")
# TAG_EXISTS=$(git tag -l "v$CURRENT_VERSION")

# if [ -z "$TAG_EXISTS" ]; then
#   echo "Bumping version with type: $VERSION_BUMP_TYPE"
#   npm version $VERSION_BUMP_TYPE
# else
#   echo "Tag v$CURRENT_VERSION already exists. Skipping version bump."
# fi

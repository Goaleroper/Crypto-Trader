#!/bin/sh

current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" = "master" ]; then
  # Set the VERSION_BUMP_TYPE environment variable as needed
  export VERSION_BUMP_TYPE=major  # Replace with 'patch', 'minor', or 'major' as required

  # Run bump-version.sh script to bump version
  ./bump-version.sh $VERSION_BUMP_TYPE

  # Check if version bumping was successful
  if [ $? -eq 0 ]; then
    echo "Version bumped successfully. Pushing changes..."
    git push origin master --tags
  else
    echo "Version bump not needed or failed. Pushing without version change..."
    git push origin master
  fi
else
  # Push changes from non-master branch directly
  git push origin "$current_branch"
fi

const { execSync } = require('child_process');
const { readFileSync } = require('fs');

// Get the latest tag
const latestTag = execSync('git describe --tags --abbrev=0').toString().trim();

// Read the changelog
const changelog = readFileSync('CHANGELOG.md', 'utf8');

// Extract the latest release notes
const releaseNotes = changelog.split('\n## ')[1].split('\n## ')[0].trim();

// Create a GitHub release
execSync(`gh release create ${latestTag} --title "${latestTag}" --notes "${releaseNotes}"`, { stdio: 'inherit' });

console.log(`Release ${latestTag} created successfully!`);

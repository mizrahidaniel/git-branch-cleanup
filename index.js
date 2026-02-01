#!/usr/bin/env node

const { execSync } = require('child_process');

const dryRun = process.argv.includes('--dry-run');
const showMerged = process.argv.includes('--merged');

function exec(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

// Get current branch
const current = exec('git branch --show-current');

// Get default branch (main or master)
const defaultBranch = exec('git symbolic-ref refs/remotes/origin/HEAD').split('/').pop() || 'main';

// Get all local branches
const branches = exec('git branch --format="%(refname:short)"').split('\n').filter(Boolean);

const protected = [defaultBranch, 'main', 'master', 'develop', current];

const mergedBranches = [];
const unmergedBranches = [];

for (const branch of branches) {
  if (protected.includes(branch)) continue;
  
  const isMerged = exec(`git branch --merged ${defaultBranch}`).includes(branch);
  
  if (isMerged) {
    mergedBranches.push(branch);
  } else {
    unmergedBranches.push(branch);
  }
}

console.log(`\n:�jU Git Branch Cleanup\n`);
console.log(`Current branch: ${current}`);
console.log(`Default branch: ${defaultBranch}\n`);

console.log(`💥 Merged branches (${mergedBranches.length}):`);
if (mergedBranches.length === 0) {
  console.log('  None found.\n');
} else {
  mergedBranches.forEach((branch) => console.log(`  — ${branch}`));
  console.log('');
  
  if (dryRun) {
    console.log('DRY RUN: Would delete these branches. Run without --dry-run to delete.');
  } else if (showMerged) {
    console.log('Deleting merged branches...');
    mergedBranches.forEach((branch) => {
      exec(`git branch -d ${branch}`);
      console.log(` ✅ Deleted: ${branch}`);
    });
  } else {
    console.log('Run with --merged to delete these branches.');
  }
}

console.log(`\n⛫ Unmerged branches (${unmergedBranches.length}):`);
if (unmergedBranches.length === 0) {
  console.log('  None.\n');
} else {
  unmergedBranches.forEach((branch) => console.log(`  — ${branch}`));
  console.log('  (⚠ Keeping these - they have unmerged changes)');
}
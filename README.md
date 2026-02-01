# Git Branch Cleanup 8✇

CLI tool to safely clean up merged and stale Git branches.

## Installation

```bash
npm install -g git-branch-cleanup
```

## Usage

```bash
# Interactive mode - review before deleting
git-branch-cleanup

# Dry run - see what would be deleted
git-branch-cleanup --dry-run

# Delete merged branches without prompting
git-branch-cleanup --merged --yes

# Find stale branches (no commits in 30+ days)
git-branch-cleanup --stale 30
```

## Features

- ✅ Detect merged branches
- ✅ Find stale branches  
- ✅ Interactive mode
- ✅ Dry-run preview
- ✅ Safe defaults (never deletes main/master/current)

## Coming Soon

- [ ] Remote branch cleanup
- [ ] Config file support
- [ ] Custom exclusion patterns
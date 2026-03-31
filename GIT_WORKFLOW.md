# Git Workflow Guide for Jobify

## 🌳 Branch Structure

```
main (Production)
  ↓
develop (Integration)
  ↓
feature/* (Features)
bugfix/* (Bug Fixes)
hotfix/* (Critical Fixes)
```

## 📋 Branch Naming Convention

- **Feature**: `feature/description` → `feature/user-login`
- **Bugfix**: `bugfix/description` → `bugfix/api-timeout`
- **Hotfix**: `hotfix/description` → `hotfix/critical-security`
- **Docs**: `docs/description` → `docs/setup-guide`

## 🚀 Workflow Procedures

### 1. Starting a New Feature

```bash
# Make sure develop is up to date
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub/GitLab
# Request review and merge into develop
```

### 2. Creating a Release (develop → main)

```bash
# Ensure everything is tested in develop
git checkout develop
git pull origin develop

# Create release branch (optional)
git checkout -b release/v0.2.0

# Update version numbers (if applicable)
# Run final tests

# Merge to main
git checkout main
git pull origin main
git merge --no-ff release/v0.2.0
git tag -a v0.2.0 -m "Release version 0.2.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge --no-ff release/v0.2.0
git push origin develop
```

### 3. Emergency Hotfix

```bash
# Branch from main
git checkout main
git pull origin main
git checkout -b hotfix/urgent-bug

# Fix bug and test
git add .
git commit -m "fix: urgent bug fix"

# Merge back to main
git checkout main
git merge --no-ff hotfix/urgent-bug
git tag -a v0.1.1 -m "Hotfix v0.1.1"
git push origin main --tags

# Merge to develop
git checkout develop
git merge --no-ff hotfix/urgent-bug
git push origin develop
```

## 📝 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build/dependency updates

### Examples
```bash
git commit -m "feat(auth): add login functionality"
git commit -m "fix(api): resolve timeout issue"
git commit -m "docs: update setup guide"
git commit -m "refactor(jobs): optimize database queries"
```

## ✅ Checklist Before Push

- [ ] Code follows project style guide
- [ ] Tests pass locally
- [ ] No console errors/warnings
- [ ] `.env` file NOT committed
- [ ] Meaningful commit messages
- [ ] Related issue referenced (if applicable)

## 🔍 Code Review Process

1. Push your branch
2. Create Pull Request with description
3. Request reviewers
4. Address review feedback
5. Ensure CI/CD passes
6. Merge to develop
7. Delete feature branch

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing
Describe how to test the changes

## Checklist
- [ ] Code review done
- [ ] Tests pass
- [ ] No console errors
```

## 🔗 Default Branches

- **Main branch**: `main` (production)
- **Develop branch**: `develop` (integration)
- **Protection rules**: Require PR reviews before merging

## 📊 Git Status Commands

```bash
# Check current branch and status
git status

# View all branches
git branch -a

# View commit history
git log --oneline -10

# View differences
git diff develop origin/develop

# Stash changes (temporary save)
git stash
git stash pop
```

## ⚠️ Important Notes

1. **Never push directly to main or develop**
2. **Always create a feature branch**
3. **Always rebase/merge from latest develop**
4. **Resolve conflicts before pushing**
5. **Keep commits atomic and logical**

---

For more info: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

# Contributing Guide

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- Git
- A code editor (VS Code recommended)

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/vanacheckin.git
   cd vanacheckin
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-owner/vanacheckin.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Branch Naming
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`
- Documentation: `docs/topic`
- Performance: `perf/improvement`

### 2. Commit Messages
Follow the Conventional Commits specification:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat(auth): add social login with Google

- Implement Google OAuth integration
- Add user profile sync
- Update documentation

Closes #123
```

### 3. Pull Request Process
1. Update documentation
2. Add tests
3. Ensure CI passes
4. Request review
5. Address feedback
6. Squash commits if needed

### 4. Code Review
- Review checklist:
  - [ ] Code follows style guide
  - [ ] Tests are included
  - [ ] Documentation is updated
  - [ ] No console logs
  - [ ] No commented code
  - [ ] No security issues

## Coding Standards

### TypeScript
```typescript
// Use interfaces for object types
interface User {
  id: string;
  name: string;
  email: string;
}

// Use type for unions and intersections
type UserRole = 'admin' | 'coach' | 'client';

// Use enums for constants
enum Status {
  Active = 'active',
  Inactive = 'inactive'
}
```

### React
```typescript
// Use functional components
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // Use hooks at the top
  const [isEditing, setIsEditing] = useState(false);

  // Use proper event handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ...
  };

  return (
    <div>
      {/* Use semantic HTML */}
      <form onSubmit={handleSubmit}>
        {/* ... */}
      </form>
    </div>
  );
};
```

### Styling
```typescript
// Use Tailwind classes
const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  return (
    <button
      className={`
        px-4 py-2 rounded
        ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200'}
      `}
    >
      {children}
    </button>
  );
};
```

## Testing

### Unit Tests
```typescript
describe('UserService', () => {
  it('should create a new user', async () => {
    const user = await createUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(user).toHaveProperty('id');
  });
});
```

### Component Tests
```typescript
describe('UserProfile', () => {
  it('should render user information', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });
});
```

## Documentation

### Code Documentation
```typescript
/**
 * Creates a new user in the system
 * @param {CreateUserInput} input - User creation data
 * @returns {Promise<User>} Created user
 * @throws {ValidationError} If input is invalid
 */
async function createUser(input: CreateUserInput): Promise<User> {
  // ...
}
```

### Component Documentation
```typescript
/**
 * UserProfile component displays user information and allows editing
 * @param {UserProfileProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  // ...
};
```

## Git Workflow

### Branch Management
```bash
# Create feature branch
git checkout -b feature/new-feature

# Keep branch updated
git fetch upstream
git rebase upstream/main

# Push changes
git push origin feature/new-feature
```

### Commit Management
```bash
# Stage changes
git add .

# Create commit
git commit -m "feat: add new feature"

# Squash commits
git rebase -i HEAD~3
```

## Review Process

### Pull Request Template
```markdown
## Description
[Describe your changes]

## Related Issues
[Link to related issues]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] E2E tests added

## Screenshots
[If applicable]

## Checklist
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] Tests added
- [ ] No console logs
- [ ] No commented code
```

## Release Process

### Versioning
Follow Semantic Versioning:
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Steps
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Run tests
5. Create pull request
6. Merge to main
7. Create release tag

## Support

### Getting Help
- Check documentation
- Search issues
- Ask in discussions
- Contact maintainers

### Reporting Issues
1. Check existing issues
2. Use issue template
3. Provide reproduction steps
4. Include error messages
5. Add screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the project's license. 
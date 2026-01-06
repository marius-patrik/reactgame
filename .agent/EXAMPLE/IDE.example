# IDE Agent Configuration

This project uses a structured agent rules system in the `.agent/` folder.

## Required Reading

**MANDATORY**: At the beginning of every coding session, read:

1. **General Rules** (`.agent/GENERAL/`):
   - `RULES` - Fundamental rules
   - `INSTRUCTIONS` - Detailed procedures
   - `COMMANDS` - Command documentation

2. **Workspace Documentation** (`.agent/LIVE/`):
   - `PROJECT_GUIDELINES` - Project-specific instructions
   - `PROGRESS` - Development progress
   - `PRODUCT` - Product description
   - `FEATURE_PRD[_<name>]` - Feature requirements

3. **Project Documentation**:
   - `README.md` - Project overview
   - `.agent/LIVE/ROADMAP` - Overall progress and milestones

## File Analysis Rules

- **MANDATORY**: Analyze all files at the start of every conversation
- **EXCEPTION**: `.agent/LIVE/` files are ignored during initial analysis (workspace-specific)
- Reference `.agent/LIVE/` files during active work

## Session Initialization

Before starting any work:

1. Read all files in `.agent/GENERAL/`
2. Read `README.md` and `.agent/LIVE/ROADMAP`
3. Initialize `.agent/LIVE/` files from `.agent/EXAMPLE/` if missing
4. Analyze the codebase structure
5. Establish context and understand current project state

## Quality Assurance

After completing ANY task:

1. Verify implementation works
2. Run lint and fix ALL issues
3. Run build and fix ALL errors
4. Test functionality
5. Update todos and documentation
6. Update `.agent/LIVE/PROGRESS`
7. Mark tasks complete (✅) only after ALL checks pass

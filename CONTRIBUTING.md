# Contributing to Lambda

First off, thank you for considering contributing to Lambda! It's people like you that make Lambda such a great social media platform.

## Code of Conduct

We have a code of conduct in place. We expect all contributors to adhere to it. Please read **Code of Conduct** before contributing.

## How Can I Contribute?

### Setting dev environment

**NOTE:** _This is just not for contributors, but also for the maintianers_

Firstly you must make sure you have all these things installed in your system:

- WSL(windows users only) - used for development, optional but recommended
- HomeBrew - used for installing supabase
- Forked and cloned the repository - follow this [guide](https://dev.to/ezpieco/how-to-contribute-in-github-48pn)
- run npm install - To install all npm packages
- Docker desktop - Used for running supabase locally for development

Once you have installed all this you're setup to start contributing!

#### Making changes to local supabase

There is still one step left before you can start contributing, you have to setup your local supabase project the same way as our supabase project, for this just do the following:

```
# Run supabase locally, will take time on first runs
supabase start

# Push all the database related content to your local supabase
supabase migration up
```

Once you have done this you will be able to see that their are some supabase tables in your supabase project

![local supabase database change after running supabase migration up](https://github.com/ezpie1/lambda-official/assets/104765117/2cc28757-cf19-4798-af41-0a0bddeab29e)

You just now have to run a SQL code in the SQL editor in order to make a supabase trigger, this trigger is used to create user profiles in the the profiles table

```sql
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_profile_for_user();
```

Now you're all set to start contributing to lambda!

## Reporting Bugs

If you encounter any bugs or issues, please create an issue in our GitHub repository detailing the bug and we will look into it.

## Suggesting Enhancements

If you have ideas for new features or enhancements, we'd love to hear them! Please create an issue in our GitHub repository detailing your suggestion.

## Your First Code Contribution

If you're looking to make your first code contribution, look for issues tagged with 'good first issue'. These are designed to be more accessible to new contributors.

### Pull Requests

1. Make changes and commit them using the styleguide
2. If you've added code that isn't in the test suits, add tests, also please conform from us for this as we can't accept code that isn't a bug fix but a new feature.
3. Make sure your code lints, for linting run `npm run lint`.
4. Ensure the test suite passes, for this run `npm run test:e2e`.
5. Now just make a PR on the staging branch

## Styleguides

It's cool to follow the rules, please at all conditions follow these styleguides so that your code is accepted and isn't different then the community.

**NOTE:** _These styleguides are to be followed by maintainers as well_

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 80 characters or less, only JSX can excied this limit, using `// eslint-disable max-len` before return statement
- Reference issues and pull requests liberally after the first line

### TypeScript Styleguide

All TypeScript must adhere to [TypeScript Standard Style](https://github.com/ezpie1/lambda-official/blob/main/.github/styleGuides/TypeScriptStyleGuide.md).

### CSS Styleguide

All CSS must adhere to [CSS Standard Style](https://github.com/ezpie1/lambda-official/blob/main/.github/styleGuides/CssStyleGuide.md).

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Issues that are bugs.
- `documentation` - Issues that are related to documentation.
- `duplicate` - Issues that are duplicates of other issues, i.e., they have already been reported.
- `enhancement` - Issues that are feature requests.
- `good first issue` - Issues that are ideal for beginners to address.
- `help wanted` - Issues that need assistance.
- `invalid` - Issues that are not valid or relevant.
- `question` - Issues that are inquiries or discussions.
- `wontfix` - Issues that we do not plan to fix.

Thank you again for your interest in contributing to Lambda!

## Contact Us

In case you have any query you can just ask it in the issue

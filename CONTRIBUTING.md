# Contributing to Lambda

First off, thank you for considering contributing to Lambda! It's people like you that make Lambda such a great social media platform.

## Code of Conduct

We have a code of conduct in place. We expect all contributors to adhere to it. Please read **Code of Conduct** before contributing.

## How Can I Contribute?

### Setting dev environment

**NOTE:** _This is just not for contributors, but also for the maintianers_

#### Linux

Follow these steps to setup your dev environment

1. Install [HomeBrew](https://brew.sh) - used for install supabase globally in your system

2. Install [Node](https://nodejs.org/en/) - Used for running and devloping the app locally

3. Install [Docker desktop](https://www.docker.com/products/docker-desktop/) - Used for running supabase locally for development

4. Forked and cloned the repository - follow this [guide](https://dev.to/ezpieco/how-to-contribute-in-github-48pn)

5. `run npm install` - To install all npm packages

6. Open docker destop, and make sure that the docker engine has started

7. Start supabase locally with `supabase start`

8. Open `localhost:54323` this is where supabase is hosted locally

9. Open the SQL editor and run this:
  ```sql
    create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.create_profile_for_user();
  ```

10. Open the Table editor and open the **Blogs and comments table** and click on the _Realtime on_ button

11. Run the app with `npm run dev`

12. Visit the app at `localhost:3000`

13. Create a test user and start making changes!

#### Windows

Follow these steps to setup your dev environment

1. Install [Scoop](https://scoop.sh) - used to install supabase globally in your system

2. Install [Node](https://nodejs.org/en/) - used for running and developing the app locally

3. Install [Docker desktop](https://www.docker.com/products/docker-desktop/) - Used for running supabase locally for development

4. Forked and cloned the repository - follow this [guide](https://dev.to/ezpieco/how-to-contribute-in-github-48pn)

5. `run npm install` - To install all npm packages

6. Open docker destop

7. Start supabase locally with `supabase start`

8. Open `localhost:54323` this is where supabase is hosted locally

9. Open the SQL editor and run this:
  ```sql
    create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.create_profile_for_user();
  ```

10. Open the Table editor and open the **Blogs and comments table** and click on the _Realtime on_ button

11. Run the app with `npm run dev`

12. Visit the app at `localhost:3000`

13. Create a test user and start making changes!

Now you're all set to start contributing to lambda!

### How to contribute?

OK just one last step and then start coding.

If you want to make any changes in lambda, please at all conditions **don't make changes directly to the main branch or the staging branch**. All changes should be made in in this order:

1. Make your changes and commit them
2. Make a PR, but to the branch which is assigned to you, this will be told at the issue you were assigned
3. Give a proper description of the changes you made, you can also add a short video of the change, showing how it affects the overall app

You must not make change PRs to the main branch as it may affect the production project in supabase. To better understand please read till the end.

### Reporting Bugs

If you encounter any bugs or issues, please create an issue in our GitHub repository detailing the bug and we will look into it.

### Suggesting Enhancements

If you have ideas for new features or enhancements, we'd love to hear them! Please create an issue in our GitHub repository detailing your suggestion.

### Your First Code Contribution

If you're looking to make your first code contribution, look for issues tagged with 'good first issue'. These are designed to be more accessible to new contributors.

#### Pull Requests

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
- Limit the first line to 80 characters or less
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

### Workflow

It's important to understand how the development workflow works here in lambda so that you know why we may ignore some of your PRs.

The workflow is as follows:

1. Changes are made to a branch checked out from the staging branch.
2. Changes are commited
3. PR is made into the new branch
4. Once the new feature or bug is complete a new PR is made to the **staging branch**
5. Once the **staging project in supabase** is sccuessfully checked for changes and updates, a new PR is made to the **main branch** 

### In detail explanation

#### Step 1

Firstly, we find a bug or a new feature is to be added to the app, we checkout of the staging branch and not the main branch, this new branch is named _fix-for-issue-<issue-number>_ or _new-feature_.

#### Step 2

Then changes are made to the new branch and then are commited to the new branch.

#### Step 4

Once changes are made, they are PRed into the new branch were these changes are end to end tested and manually tested for conformation.

#### Step 4

Once the new feature is added or the bug is fixed, a PR is made to the staging branch. We have an extra supabase project which is used to check if all the changes made locally are successfully updated to the supabase project.

**NOTE:** _These PRs are usually made **once a week or once a month**_

#### Step 5

Once it's conform that the supabase project isn't failling to update it's database and all changes are made, a new PR is made to the main branch, this branch though, is connected to the production project and thus any changes made to the main branch will affect the production project.

---

Thank you again for your interest in contributing to Lambda!

## Contact Us

In case you have any query you can just ask it in the issue

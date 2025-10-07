# API Contracts: Blog Modernization

Since this project is a frontend-only application that interacts with the GitHub Gist API, there are no new backend API contracts to define. The application will continue to use the public GitHub Gist API for all data operations.

The primary "contract" is the structure of the data stored in the Gists, which will remain unchanged. The application will need to correctly parse the content of these Gists to display the blog posts, projects, and other information.

The interaction with the GitHub API is handled by the `src/api/` modules. These will be updated to use `axios` and to handle any changes in the data fetching logic required by the Vue 3 migration.

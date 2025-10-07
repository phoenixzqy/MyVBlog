# Quickstart: Blog Modernization

This guide provides the steps to get the modernized blog application running locally.

## Prerequisites

-   Node.js (LTS version)
-   npm or yarn

## Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/phoenixzqy/MyVBlog.git
    cd MyVBlog
    ```

2.  **Checkout the feature branch**:
    ```bash
    git checkout 002-blog-modernization-i18n
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

4.  **Configure GitHub Gist**:
    -   The application uses a GitHub Gist to store its data. You will need to have a `configuration.json` file in the `static/` directory with the correct Gist ID and user information.
    -   A sample `configuration.json` looks like this:
        ```json
        {
          "gist_id": "YOUR_GIST_ID",
          "user": "YOUR_GITHUB_USERNAME"
        }
        ```

## Running the Development Server

Once the setup is complete, you can start the development server:

```bash
npm run dev
```

This will start a local server, and you can view the application in your browser at the URL provided in the terminal output (usually `http://localhost:8080`).

## Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This will generate the static files for the application in the `dist/` directory. These files can then be deployed to any static hosting service.

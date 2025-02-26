# Node Web Server

This project is a simple Node.js web server that provides a directory listing and allows users to download files from a specified directory.

## Features

- Directory listing of files in a specified directory.
- Ability to download files directly from the server.

## Project Structure

```
node-web-server
├── src
│   ├── server.js          # Entry point of the application
│   ├── routes
│   │   └── index.js       # Route definitions for the application
│   └── utils
│       └── fileHandler.js  # Utility functions for file handling
├── public
│   └── README.md          # Documentation for public assets
├── package.json           # npm configuration file
└── README.md              # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd node-web-server
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the server, run the following command:
```
node src/server.js
```

The server will start and listen for requests. You can access the directory listing by navigating to `http://localhost:3000` in your web browser.

## License

This project is licensed under the MIT License.
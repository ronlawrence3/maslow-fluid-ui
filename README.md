# Maslow CNC alternate UI

This project provides a different, more modern, user interface for the Maslow CNC machine. It is built using the Tauri framework, which allows for a single codebase to be compiled to native applications for Windows, MacOS, and Linux.

## Features

- Modern, responsive user interface
- Cross-platform support
- Offline support

## Installation

To install the application, see the releases page for pre-built binaries for Windows, MacOS, and Linux.

## Development

To develop the application, you will need to have Node.js and npm installed. We recommend nodenv, which allows you to manage multiple versions of Node.js on your system.

Once you have a nodejs installed, you can then clone the repository and run the following commands:

```bash
npm install
npm run tauri dev
```

This will start the development server and open the application. You can then make changes to the code and see them reflected in real-time.

## Building

To build the application, you can run the following command:

```bash
npm run tauri build
```

This will create a distributable package for your platform in the `dist` directory.

## Contributing

If you would like to contribute to the project, please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

This project would not have been possible without the hard work of the Maslow CNC team and the open-source community. We would like to thank them for their contributions to the project.

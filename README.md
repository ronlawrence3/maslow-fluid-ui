# Maslow CNC alternate UI

This project provides a different, more modern, user interface for the Maslow CNC machine. It is built using the Tauri framework, which allows for a single codebase to be compiled to native applications for Windows, MacOS, and Linux.

## Features

- Modern, responsive user interface
- Cross-platform support
- Offline support

## Installation

To install the application, see the releases page for pre-built binaries for Windows, MacOS, and Linux.

## Development

To develop the application, you will need to have bun installed on your system. Bun is a node alternative that allows you to build and run the application.
You can install bun by visiting the [bun website](https://bun.sh/docs/installation) and following the instructions for your platform. You will also need to ensure your system meets the requirements for building Tauri applications. See the [Tauri documentation](https://v2.tauri.app/start/prerequisites/) for more information.

Once you have bun and the tauri prerequsites installed, you can run the following commands to start the development server:

```bash
bun install
bun run tauri dev
```

This will start the development server and open the application. You can then make changes to the code and see them reflected in real-time.

## Building

To build the application, you can run the following command:

```bash
bun tauri build
```

This will create a distributable package for your platform. It takes a long time to build the application, at least the first time, so be patient.

## Contributing

If you would like to contribute to the project, please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

This project would not have been possible without the hard work of the Maslow CNC team and the open-source community. We would like to thank them for their contributions to the project.

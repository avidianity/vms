# VMS

## Installation

Requirements

- [NodeJS](https://nodejs.org) (version 14 or above)
- [Git](https://git-scm.com)

1. Pick a folder to save project in then open a terminal (or right click + Git Bash here)

2. Clone the repository

```sh
git clone https://github.com/avidianity/vms.git
```

3. Change directory to the project

```sh
cd vms
```

4. Install yarn if you haven't yet

```sh
npm install -g yarn
```

5. Create a file called `.env` into the root folder (outside of `public` and `src` is called the `root` folder) and paste all of the example values from `.env.example` to your newly created `.env` file.

6. Add the following configuration variables (ignore any variables not mentioned but don't remove them) to the `.env` file

```env
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```

7. Install dependencies

```sh
yarn
```

## Running the application

```sh
yarn start
```

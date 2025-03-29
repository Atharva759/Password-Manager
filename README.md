# Password Manager

This project is a simple Password Manager built using React, allowing users to store and manage their passwords securely. The application allows users to add, edit, delete, and view their passwords. The passwords are stored in the browser's `localStorage`, ensuring persistence across sessions.

## Features
- **Add Password**: Users can add a password entry by providing the website URL, username, and password.
- **View Password**: The passwords are initially hidden, and users can toggle the visibility of the password using an eye icon.
- **Edit Password**: Users can edit the existing password details.
- **Delete Password**: Users can delete any stored password from the list.
- **Persistent Storage**: The password list is stored in the browser's `localStorage`, so the data persists even after the page is refreshed.

## Technologies Used
- **React**: The front-end is built with React, a JavaScript library for building user interfaces.
- **React Icons**: Icons for showing/hiding passwords are from the `react-icons` package.
- **UUID**: The `uuid` package is used to generate unique identifiers for each password entry.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/password-manager.git
```
### 2. Navigate to the project folder
```bash
cd password-manager
```
### 3. Install the dependencies

```bash
npm install
```

### 4. Run the application
```bash
npm run dev
```

This will start the development server, and you can open the application in your browser at http://localhost:5173/

## How to Use

### Adding a Password:
- Fill in the Website URL, Username, and Password fields.
- Click the **Add Password** button to save the entry.

### Viewing Passwords:
- Stored passwords are hidden by default.
- Click the **eye icon** next to the password to toggle the visibility.

### Editing Passwords:
- Click the **Edit** button next to the password entry to modify it.
- The password form will be populated with the existing details, allowing you to make changes.

### Deleting Passwords:
- Click the **Delete** button next to a password entry to remove it from the list.

## Code Structure

- **Manager.js**: The main component that handles the password management functionalities (add, edit, delete, show/hide passwords).
- **uuid**: The `uuid` library is used to generate unique IDs for each password entry to handle edits and deletions correctly.
- **react-icons**: Used for showing eye icons to toggle password visibility.

## Local Storage

The passwords are stored in the browser’s `localStorage`, and are retrieved on component load using the `useEffect` hook. Each password entry is saved as a JSON object and can be manipulated directly by modifying the `passarr` state.

## Potential Improvements

- **Security Enhancements**: Passwords are currently stored in `localStorage` in plain text. In a real-world application, passwords should be encrypted before storage.
- **User Authentication**: Adding user authentication to secure access to the password manager.
- **Styling and UI/UX**: Enhancing the UI/UX with better styling, animations, and form validation.

## License

This project is open source and available under the MIT License. See the [LICENSE](LICENSE) file for more details.

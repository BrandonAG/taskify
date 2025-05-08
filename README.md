# Taskify

Keep track of all of your project tasks.

## Setup

### Download Packages

Inside the client and server folders run the following command to download required packages.

```
npm install
```

### Database Environment File

Create a .env file at the root fo the server folder and populate the following inside it. Replace the quoted text with your credentials.

```
DB_NAME="your_project_name"
DB_USER="your_username"
DB_PW="your_password"
```

## Starting The UI in Dev Mode

In separate terminals for the server and client run the following at the root of each folder.

```
npm start
```
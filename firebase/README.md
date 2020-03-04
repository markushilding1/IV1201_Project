# Firebase Cloud & Heroku PostgresQL Database
The application is hosted on the firebase platform, by Google. Firebase hosts the react application as well as the Rest API for handling all business logic. The database is a SQL database and is hosted on Heroku as Firebase does not support SQL databases.


## Firebase Console
Permission needed to access the console.
https://console.firebase.google.com/project/iv1201-g7/overview

## Dev Environment Setup
The following sections explains how to install firebase tools on your system and how to serve the rest api locally. 

### Installing Firebase CLI
```shell
npm install -g firebase-tools
```

### Login with CLI
You will be promted to login with email and password. Access to project is needed to succeed with this step.
```shell
firebase login
```

### Serving api locally
```shell
firebase serve --only functions
```

## Building & Deploying the app

### Deploying to production
First build the react app with "npm run build" and move the content created in *react_app/build* into *firebase/public*. Then run following command. 
```shell
firebase deploy
```

## PostgresQL Database

### Connection
To connect to the database. Use the function *conn* in file *firebase/functions/commmon/db/index.js* as following.

```javascript
// Import database module
const db = require('./relative/path/to/db/index.js');

// Init a connection
const client = db.conn()
```

### Database Schema
![Database Schema](./db.png)
# IV1201_Project
Design of Global Applications



## Firebase

### Console URL
https://console.firebase.google.com/project/iv1201-g7/overview

### Development Setup

#### Installing Firebase CLI
```shell
npm install -g firebase-tools
```

#### Login with CLI
```shell
firebase login
```

#### Deploying to production
First build the react app with "npm run build:production".
```shell
firebase deploy
```

#### Serving api locally
```shell
firebase serve --only functions
```



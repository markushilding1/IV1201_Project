This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


###` npm run prettify`
Run the  prettier script found in `IV1201_Project\react_app\src\`
It refractors the code according to the rules specified in the script.   

#Local Setup 
Running local set up will install all dependencies. It watches JS, and images, then compiles and reloads accordingly.

```
$ cd IV1201_Project\react_app
$ npm install
$ npm run start
```

#Deploying

Running the `npm run build` script creates the build folder that contains the appropriate files.
These then need to be move to the firebase public folder. 

# Eslint & Prettier

The project uses eslint and prettier to check and enforce code standards. 
The project uses google's style guide for javascript [Can be seen here](https://google.github.io/styleguide/jsguide.html)
The Prettier script can be altered to follow other code conventions if needed.

#File Structure

The react_app has the following structure 
```
react_app
|----node_modules
|----public
|----src
     |----common
     |    |----auth 
     |   
     |----components 
     |    
     |----config
     |    
     |----containers
     |    |    
     |    |----pages
     |    
     |----settings
     |    
     |----store
     |    
     |----utils
```
The file structure is made to keep each component separate and to make sure there are no unnecessary
dependencies. If a new page is added it should be placed in containers as its own page.  
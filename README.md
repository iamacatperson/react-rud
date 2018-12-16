# React RUD App 

React RUD is a simple read, update, delete (hence RUD) app made using React.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

* Clone the repo in your terminal by clicking the green clone or download button at the top right and copy the URL

* In your terminal, type ```git clone URL```

* Replace ```URL``` with the url you copied
hit enter. This will copy all the files from this repo down to your computer.

* In your terminal, cd into the directory you just created

 ```cd react-rud```

* Type ```npm install``` to install all dependencies

## Important: Before you start the app

### 1. Provide Firebase credentials

This application uses [Firebase](https://firebase.google.com/) for a simple registration and login authentication.

To add Firebase credentials needed for this functionality:

* Add a `.env` file in the root folder of the project (```react-rud/.env```) to set environment variables. Copy in the credentials to this file.

### 2. Run a fake API server

This application uses [json-server](https://github.com/typicode/json-server "JSON Server") as a fake REST API server. Before doing ```npm install```, you must run the fake server first so that the application has some data to render.

To do that, type the following in your terminal

```json-server --watch db.json --port 3001```

Since ```json-server``` needs to run concurrently with the app, it's run using port 3001. React's standard port is 3000.

```db.json``` was generated using [faker](https://www.npmjs.com/package/faker).

## You can now start the app

* In your terminal, open a new tab (```cmd + T```).
* Type ```npm start``` to start the application

The app will run on port 3000.

You will be redirected to a login page. You may use ```admin@gmail.com / 123456``` to login or you may register a new one.

## Functionality overview

* Authenticate admin users via Firebase (login/signup pages + logout button)
* Displays paginated and sortable lists of users / members
* Read, update, delete users / members
* Search users

## License
[MIT](https://choosealicense.com/licenses/mit/)

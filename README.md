# Expense Tracker
## Try the Application here:
https://expense-tracker-dos.netlify.app
*NOTE: Since there are unlikely to be any users using this, the site hosting the server may have unloaded the project from server memory, and therefore the server may take
a few seconds to respond at first (when logging in / registering, if no errors appear in red text, the server should respond after a few seconds).

## Introduction
This is an expense tracking application built on the MERN stack (MongoDB, Express, React, NodeJS).
This application uses a RESTful API to authenticate users, and create / delete transactions. A user can register, log in, create transactions, delete transactions. When the user logs in,
all of their expenses/income transactions that they have created will be loaded from the DB. All passwords are encrypted on the database. The project makes use of JWTs for saving user authentication, 
which will expire after an hour, therefore the user can access the site for an hour after logging in without needing to input their login credentials again.

## Clone the project

To run the project, first install scripts in both the root folder and client folder (npm install). Next, run nodemon (or npm run dev) in the command line from the root folder (starts the server),
and npm start in the client folder. For the project to run successfully, create a config.env file in the config folder, and create two environment variables, a MONGO_URI variable (which is the link to MongoDB)
and a JWT_KEY which is the JWT secret key for the JWT created when the user logs in.

## Sample Images
Login page
![Login page](https://github.com/doleksiyenko/Expense-Tracker/blob/master/images/login.PNG)

Invalid credentials (logging in)
![Invalid credentials (logging in)](https://github.com/doleksiyenko/Expense-Tracker/blob/master/images/invalidcredentials.PNG)

Invalid Registration
![Invalid Registration](https://github.com/doleksiyenko/Expense-Tracker/blob/master/images/registrationInvalid.PNG)

A new user page
![A new user page](https://github.com/doleksiyenko/Expense-Tracker/blob/master/images/newusergenerated.PNG)

Adding new expenses/incomes
![Adding new expenses/incomes](https://github.com/doleksiyenko/Expense-Tracker/blob/master/images/Sampleexpenses.PNG)

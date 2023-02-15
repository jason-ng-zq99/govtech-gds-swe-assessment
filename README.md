# Tic Tac Toe Game
![Screenshot 2023-02-14 at 23 00 20](https://user-images.githubusercontent.com/54024886/218775419-f249f2eb-0da6-47ab-878a-8721795bf3e8.png)

## Introduction
This is a simple tic tac toe game that aims to be inclusive to persons-with-disabilities.
Players are able to create unique game rooms that allows you to have your private game with a friend.

## Accessibility features at a glance
- Descriptive HTML tags for screen reading
- Large and contrasting buttons for great visibility<br/>
![Screenshot 2023-02-14 at 23 10 10](https://user-images.githubusercontent.com/54024886/218777850-8bcb3c88-f60e-4551-bbda-29177b582060.png)

## Setting up (without database)
1. Clone this repository on your local machine.
2. Install the relevant dependencies:
  - In the root directory, run `pip install -r requirements.txt`.
  - `cd` to the `client` directory and run `npm install`.
3. While in the root directory, run `python3 app.py`.
4. Create 2 new tabs in your terminal.
5. In each tab, `cd` to the `client` directory, and run `npm start`.<br/>
The second tab you run the command on might ask if you want to run the web page on another part.<br/>
Agree and enter `y`.
6. Two webpages should be launched and you can play the game!

## Setting up (with database)
1. Create your own [Firebase project](https://console.firebase.google.com/u/0/)
2. Build a Firestore Database
3. Generate a private key (stored in a `json` file) at `Project Settings` -> `Firebase Admin SDK` -> `Python`
4. Create a `.env` file at the root of the project, and fill in the corresponding details as per the `json` file:
- `DB_PROJECT_ID`
- `DB_PRIVATE_KEY_ID`
- `DB_PRIVATE_KEY`
- `DB_CLIENT_EMAIL`
- `DB_CLIENT_ID`
- `DB_CLIENT_X509_CERT_URL`
- An example will be `DB_PROJECT_ID=my-test-id`

## Tech stack
- ReactJS (frontend)
- Flask (backend)
- Flask SocketIO (socket API library)
- Firebase (database)

## Design considerations
- Chose Flask as it is relatively lightweight, hence faster to develop for a smaller-scaled application
- Firebase was chosen so that the code for database management would largely remain the same when scaled up to deployment on online servers

## Accessibility considerations
- Decided to make a tic tac toe board with large buttons and contrasting (red vs green) buttons for greater visibility.
- Conscious effort in choosing the correct HTML tags so that it can complement the work of screenreaders.
- Minimal UI so that it does not become confusing and counterintuitive to navigate.

## Work in progress
- Unfortunately, the socket APIs are not yet fully integrated hence the unique game rooms still cannot be created,<br/>
so games are still single browser as of now
- Backend APIs for retrieving game history
- Hosting on online servers

## Architecture Diagram
![Architecture Diagram](https://user-images.githubusercontent.com/54024886/218786138-c6b3237a-df0a-4fbb-bf54-2c3a90d701d6.png)

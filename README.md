# OKFido

[Live Link](https://okfido.herokuapp.com)

## Background and Overview
OKFido is a full stack clone of OKCupid that connects humans who want to adopt dogs with dogs seeking a home.

## Functionality and MVP
* User authentication: sign up and log in
* Listing of adoptable dogs with index and show pages
* Dog show page includes dog picture, specific dog info, and breed info
* Humans can search dogs based on criteria (ie. good with children) and location
* Humans and dogs can send messages to each other.


## Technologies

* **Backend:** MongoDB/Express/GraphQL
* **Frontend:** React/Node.js/React-Apollo
* **Hosting:** Heroku
* TheDogAPI for breed info
* Petfinder API for adoptable dogs' info
* BCrypt for user authentication

## Technical Challenges
* Pulling info from the APIs
* Searching by different criteria
* Instant Messaging

## Media
* Reloading dogs list as search criteria are changed
![Search Gif](./client/src/assets/media/search2.gif)

* Viewing conversations and messaging dogs
![Conversations Gif](./client/src/assets/media/conversations.gif)

## Future Todos
* add a cute loading icon ( maybe a dog runs to a person or something :) )
* refactoring to make use of similiar components 
* add more search filters (breed)
* deleting likes / messages when the dog has already been adopted
* sorting results by match percent or other criteria
* user profile to change dog preferences, or zipcode, etc

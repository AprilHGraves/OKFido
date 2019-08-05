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

## Group Members and Work Breakdown

* April Graves
* Christie Brandao

### Friday, July 26th
* Project Design - both
* Wiki - both
* Research on APIs - christie
* Build skeleton site - both
* User model - both
* Basic splash page - christie
* Backend user sign in/sign up - april

### Monday, July 29th
* Dog and Message Models - both
* Connect external APIs to app - christie
* Frontend user sign in/sign up - april

### Tuesday, July 30th
* Index page of adoptable dogs - christie
* Backend for grabbing dogs from Petfinder API - christie
* Onboarding questionnaire - april

### Wednesday, July 31st
* Show page of dog - christie
* Connect other external api for breed info - christie
* Navbar / routing / user dropdown - april
* Like / Unlike - april

### Thursday, August 1st
* Match percent - christie
* Like / Unlike - april
* Liked Dog Index - april

### Friday, August 2nd
* Search Frontend - christie
* Converstions - april

### Sunday, August 4th
* Search backend - christie
* Messages - april

## Future Todos
* add a cute loading icon ( maybe a dog runs to a person or something :) )
* refactoring to make use of similiar components 
* add more search filters (breed)
* deleting likes / messages when the dog has already been adopted
* sorting results by match percent or other criteria
* user profile to change dog preferences, or zipcode, etc

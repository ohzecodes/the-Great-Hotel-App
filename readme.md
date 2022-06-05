# The Great Hotel App

## Overview

This was a final project for my Full Stack Web Development Course (CPSC 2600). This was a solitary project that enabled me to build a web Application to rate hotels (just like trip-advisor).

The purpose of this project was to demonstrate the MERN stack skills that we acquired in class.

## Project timeline.

The class was given 15 days to build an entire application with these [technologies](#Technologies-used)

- My technical skillset
- Ability to learn fast
- Ability to work under pressure

## Technologies used

- Deployment
  - Heroku
- Backend
  - Express JS
  - MongoDB
  - NodeJS
- Frond End
  - Tons of React!

## Wins and blockers

### Wins

- I enjoyed writing
  - aggregate functions to join MongoDb collections.
  - validation tools to verify and sanitize the data (validators.js)
  - Animating the Stars
- I Appreciate react's ability to update content real time

### Blockers

- Time
- We were limited to the concepts learned in class. This was to solidify understanding.
- Heroku for deployment: so images are removed after a while, replace by a placeholder image
- Spend a bit more time on the UI

#### If I were to make this project again, I would:

1.  Add User profile
    - Add email based Authentication for the user
    - Redesign the database to support user profiles
2.  Step by Step forms
3.  Employ Redux

## Aproach taken

I knew I had limited time to work on this project so planing was exremely important. I started off with sketching the front end on a white board. Then, I worked on integrating the mongodb and other related functions and build my apis, then after building my fronend, I worked on validating the data. Lastly, I saw if there is any need of anything else to work on.

## Usage

run `npm run key` to enter your mongo connection string

### First form:

- hotel name should be unique
- name, city, and streetaddress should be 5 or more characters

- Image:
  - as of this moment only one image is allowed per hotel
  - ImageName: must be alphanumeric charecters only
  - Image size must not be bigger than 5MB.
  - Images must have a unique name.
  - each hotel has an image-> the user cannot submit the form without image
  - hotels cannot stay without a picture.
  - Images may be added on the storage if the hotel is not there meaning eventhough if there is an error on validation still the image will be posted. The user is expected to fix the problem if validation error .
  - images are handled by multer which is an multiware for multipart form data handling ---> link for this is in the reference section.

## Second Form

User needs to select the hotel and then use the stars to rate his stay.

## References

#### Middleware

- multer --> filehandling
- express-readme --> for the man page https://thegreathotelapp.herokuapp.com/man

- sample data images

  - https://unsplash.com/photos/lRowikzz4cw
  - https://unsplash.com/photos/2gOxKj594nM
  - https://unsplash.com/photos/M7GddPqJowg
  - https://unsplash.com/photos/xuK2crQLELk
  - https://pixabay.com/vectors/background-lines-shapes-1789175/

- tutorials

  - https://youtu.be/XeiOnkEI7XI
  - https://youtu.be/9Qzmri1WaaE

- Used from bootstap:

- https://getbootstrap.com/docs/4.0/components/card/ --> for displaying the hotel element
- https://getbootstrap.com/docs/4.0/components/modal/ --> for displaying comments
- https://getbootstrap.com/docs/4.0/layout/grid/ --> grid system

- using bootstrap with fontawesome
  - bootstrap : https://getbootstrap.com/
  - font Awesome: https://fontawesome.com/
  - logo -- https://looka.com/editor/86952643
  - react icons -- https://react-icons.github.io/react-icons/

## Hosting

Serving the project at [hotel App](https://thegreathotelapp.herokuapp.com/)

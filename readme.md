# The Great Hotel App

## Overview

This is a web application for rating hotels, similar to the popular site TripAdvisor. It was developed as part of My Full Stack Web Development Course (CPSC 2600) as a final project, and it allowed me to showcase my skills and demonstrate my ability to create a functional web application from start to finish.

### Prerequisites

1. Have NodeJS and npm installed for building the project

### Purpose

The Purpose of this project was to demonstrate the MERN stack skills that we acquired in class.

### Scope

The following items are in scope for this build:

- Authentication
- Adding, and Viewing hotels
- Rating a Hotel

The following items are in not scope for this build:

- Deleting an Hotel
- Updating an Hotel
- User profiles

## Project timeline

The class was given 15 days to build an entire application with these [technologies](#Technologies-used)

### This project demonstrates

- My technical skillset
- Ability to learn fast
- Ability to work under pressure

## Usage

##### Install Software

1.  To get started you will need to install as mentioned in the [Prerequisites Section](#Prerequisites):

    1. NodeJS
    2. Npm

##### Cloning repository & Variable Adding & installing dependencies & running server

2. Clone this repository then add the following variables to /src/auth/connect.php
3. run `npm i` to install the dependencies for the project
4. run `npm run key` to enter your MongoDB connection string and other
5. run `npm run dev` to run your server locally

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

- Render for deployment: so images are removed after a while, replace by a placeholder image

#### If I were to make this project again, I would:

1.  Add User profile
    - Add email based Authentication for the user
    - Redesign the database to support user profiles
2.  Step by Step forms
3.  Employ Redux

## Form Input

### First form (New Hotel Form):

- Hotel name should be unique
- name, city, and street address should be 5 or more characters

- Image:
  - as of this moment only one image is allowed per hotel
  - ImageName: must be alphanumeric characters only
  - Image size must not be bigger than 5MB.
  - Images must have a unique name.
  - each hotel has an image-> the user cannot submit the form without image
  - hotels cannot stay without a picture.
  - Images may be added on the storage if the hotel is not there meaning even though if there is an error on validation still the image will be posted. The user is expected to fix the problem if validation error.
  - images are handled by Multer which is an middleware for multipart form data handling ---> link for this is in the reference section.

## Second Form(Review an Existing Hotel)

User needs to select the hotel and then use the stars to rate his stay.

## References

#### Middleware

- multer --> filehandling

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

Serving the project at [hotel App](greathotel1.onrender.com/)

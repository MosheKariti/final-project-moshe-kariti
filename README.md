# Start the project
- Clone the project
- Run the server 
  - cd server
  - npm install
  - npm run start
- Run the client
  - npm install
  - npm run start

# Introduction
React project, requirements by Hacker U.
- The client side was made by me (Moshe Kariti).
- The Server side was made by Hacker U.

**Installations:**
- terminal A:
    - cd server
- run 'npm install'
- run 'node server'
- terminal B:
    - run 'npm install'
- run 'npm start'

**Admin User**
- email: moshek.system.user@gmail.com
- password: SystemUser123!

**Initial data method (see details in the initialData file)**
According to the requirements, the project must include 3 cards on teh first run.
- In the first run:
    - if user with email "moshek.system.user@gmail.com" is not exist ->
    - the system creates an Admin user (see credentials above)
- if card with email "systemcard1@gmail.com" is not exist
- the system create 3 initial cards

**Bonuses**
All bonuses were developed.
- Update user details
- CRM system (for admin only)
- User block after 3 failed entries
- there is no API in the server for that logic, I developed it using localStorage (currently not supported with multi devices)

**Work Methods**
- Global states are created in App.js (I do not use Redux).
- Server requests using Axios.
- Main libraries
- MUI
- React icons
- React router

**Known issues**
- UI issues on MAC


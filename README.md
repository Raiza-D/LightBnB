# LightBnB

LightBnB is a simple, single-page clone to AirBnB.

Users sign up for an account where they can create a new listing to rent out their homes to people on vacation. Account holders can search for properties available for rent using the Search feature, which pulls data from the database. Account holders can also view any existing properties they own and have listed for rent as well as view past and current reservations.

The purpose of this project was to design a database using server-side JavaScript to display the information from queries to web pages. It offered practice working with simple and complex SQL queries, relational databases and ERD (entity relationship diagram) design to integrate the database with a Node backend, using PostgreSQL and node-postgres (Node PG).

## Final Product

Sign up page
!["Signup page"](https://github.com/Raiza-D/LightBnB/blob/main/docs/LightBnB_signup.png?raw=true)

Login page
!["Login page"](https://github.com/Raiza-D/LightBnB/blob/main/docs/LightBnB_login.png?raw=true)

Logged in view
!["View when user logged in"](https://github.com/Raiza-D/LightBnB/blob/main/docs/LightBnB_loggedinview.png?raw=true)

Search for a rental property
!["Search page with filters](https://github.com/Raiza-D/LightBnB/blob/main/docs/LightBnB_search.png?raw=true)

View past and current reservations
![My Reservations page showing past and current reservations](https://github.com/Raiza-D/LightBnB/blob/main/docs/LightBnB_myreservationspage.png?raw=true)

## Database Structure

## Project Structure


## Getting Started
1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
4. Start the web server using the `npm run local` command. The app will be served at http://localhost:3000/.
5. Go to http://localhost:3000/ in your browser (preferably Chrome).

## Dependencies
- `bcrypt: ^3.0.6`
  - (If you have an error after starting the server, uninstall bcrypt and install again using a higher version e.g. version `5.1.0`)
- `body-parser: ^1.19.0`
- `cookie-session: ^1.3.3`
- `express: ^4.17.1`
- `nodemon: ^1.19.1`
- `pg: ^8.7.3`

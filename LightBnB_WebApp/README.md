# LightBnB

LightBnB is a simple, single-page app that mimics AirBnB.

Users sign up for an account where they can create a new listing to rent out their homes to people on vacation. Account holders can search for properties available for rent using the Search feature, which pulls data from the database built for the app. Account holders can also view any existing properties they own and have listed for rental as well as view a list of past and current reservations.

The purpose of this project was to design a database using server-side JavaScript to display the information from queries to web pages. It offers practice working with simple and complex SQL queries, relational databases and ERD (entity relationship diagram) design to integrate the database with a Node backend, using `PostgreSQL` and `node-postgres (Node PG)`.

The front-end and server codes were already built and provided upon starting this project. The database itself and queries to retrieve data from had to be built and therefore, were added onto the existing components of the app.

## Project Structure

```
├── public
│   ├── index.html
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── index.js
│   │   ├── libraries
│   │   ├── network.js
│   │   └── views_manager.js
│   └── styles
├── sass
└── server
  ├── apiRoutes.js
  ├── database.js
  ├── json
  ├── server.js
  └── userRoutes.js
```

* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `sass` contains all of the sass files. 
* `server` contains all of the server side and database code.
  * `server.js` is the entry point to the application. This connects the routes to the database.
  * `apiRoutes.js` and `userRoutes.js` are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database.


  ## Getting Started

  1. Create a new repository using this repository as a template.
  2. Clone your repository onto your local device.
  3. Install dependencies using the `npm install` command.
  4. Start the web server using the `npm run local` command. The app will be served at http://localhost:3000/.
  5. Go to http://localhost:3000/ in your browser (preferably Chrome).

# Backend Application for Morning Light Planner

## Overview

This is the backend application for Morning Light Planner, providing APIs and GraphQL endpoints to manage data and interact with the frontend. It uses Node.js, Express, MongoDB (via Mongoose), and GraphQL for scalable and efficient server-side operations.

## Features

* REST and GraphQL APIs for managing user data, authentication, and app functionality.
* MongoDB as the database with Mongoose for schema management.
* Error handling and logging with custom middleware.
* Supports environment-based configuration.

## Technologies

* Node.js: JavaScript runtime for building server-side applications.
* Express: Fast and lightweight web framework for building APIs.
* MongoDB: NoSQL database for data persistence.
* Mongoose: ODM (Object Data Modeling) library for MongoDB.
* GraphQL: Query language for APIs.
* dotenv: Environment variable management.

## Getting Started

## Prerequisites

### Ensure you have the following installed on your system:

* Node.js (v16.x or above)
* npm (v8.x or above)
* MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
`git clone https://github.com/your-repo/morning-light-planner-backend.git
cd morning-light-planner-backend`

2. Install dependencies:
`npm install`

3. Create a .env file in the root directory with the following variables:
`PORT=4000
   MONGO_URI=mongodb://localhost:27017/morning-light-planner
   GRAPHQL_ENDPOINT=/graphql`

4. Start the MongoDB server if not already running:
`mongod`

5. Run the application:
`npm run dev`

# **API Documentation**

## REST Endpoints

|Method	|Endpoint	    |Description
|GET	|/healthcheck	|Health check for the API
|POST	|/login	        |User login authentication
|POST	|/signup	    |Register a new user

## GraphQL Queries
The GraphQL API is available at /graphql.

Example query:
`query {
            users {
                id
                email
                profileName
            }
        }`

## GraphQL Mutations

## Contributing
1. Fork the repository. 
2. Create your feature branch:
`git checkout -b feature/your-feature`
3. Commit your changes:
`git commit -am 'Add new feature'`
4. Push to the branch:
`git push origin feature/your-feature`
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

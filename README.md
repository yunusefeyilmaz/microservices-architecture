# About This Repository

This repository hosts two versions of a software application designed to demonstrate and compare **Monolithic** and **Microservices** architectures. The aim is to provide a hands-on example showing how the same application functionality can be implemented in both architectural styles, highlighting the trade-offs and benefits of each approach.

# Monolithic Architecture Project

This project contains a Node.js application using Express.js framework that demonstrates a monolithic architecture for managing books, authors, and users. It includes basic CRUD operations and is designed to help understand how to build and structure a monolithic application. The application also features a simple load balancer that distributes incoming HTTP requests across two server instances.

![Screenshot 2024-04-25 135521](https://github.com/yunusefeyilmaz/microservices-architecture/assets/89478740/5b336e55-ce2f-4900-8e15-8b6c53090510)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js, npm, and PostgreSQL installed on your local machine. You can download and install Node.js and npm from [Node.js official website](https://nodejs.org/), and PostgreSQL from [PostgreSQL official website](https://www.postgresql.org/download/).

### Installing

1. Clone the repository:
   ```sh
   git clone https://github.com/yunusefeyilmaz/microservices-architecture.git
   ```
2. Navigate to the project directory:
    ```sh
   cd microservices-architecture/MonolithicArchitectureProject
   ```
3. Install the required npm packages:
   ```sh
   npm install
   ```
5. Create a `.env` file in the root directory and fill it with your PostgreSQL credentials and other configurations as needed:
     ```sh
    DB_USER=your_username
    DB_PASS=your_password
    DB_HOST=localhost
    DB_NAME=your_database
    DB_PORT=5432
   ```
6. Start the application servers:
      ```sh
   npm start
   ```
### Database Setup

Since the server interacts with PostgreSQL for data management, ensure PostgreSQL is installed and running on your system. You will need to create a single database and three tables within it: `users`, `books`, and `authors`.

- Create Tables
  -  ```sh
      -- Create the 'users' table
      CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL
      );
      
      -- Create the 'books' table
      CREATE TABLE books (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL
      );
      
      -- Create the 'authors' table
      CREATE TABLE authors (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          country VARCHAR(255)
      );
     ```
  
You need to create a `.env` file in your project root directory (where your `server.js` is located) that includes the necessary environment variables for your PostgreSQL database and any other required configurations.

### API Endpoints
- **GET /users:** Fetch all users
- **POST /users/create:** Create a new user
- **GET /users/:id:** Fetch a single user by ID
- **GET /books:** Fetch all books
- **POST /books:** Add a new book
- **GET /authors:** Fetch all authors
- **POST /authors:** Add a new author

### Load Balancer

The load balancer listens on port 8080 and distributes requests randomly between two server instances running on ports 3000 and 3001.

# Microservice Architecture Project

This repository contains a microservices architecture project that includes an API Gateway and three service components: User Service, Book Service, and Author Service. The API Gateway handles routing and forwarding requests to appropriate services based on the configured paths.

![image](https://github.com/yunusefeyilmaz/microservices-architecture/assets/89478740/7435a0e3-b1ed-44a8-b17d-5bc53e5eb8ed)

### Project Structure
- **api-gateway:** Node.js application that acts as an API gateway. 
- **user-service:** Node.js application for user management. 
- **book-service:** Node.js application for book management. 
- **author-service:** Flask application for author management. 
- **docker-compose.yml:** Docker Compose file to orchestrate the building and running of all services.

### Services Description
- **API Gateway:**
   - Built with Express and http-proxy. 
   - Routes requests to the appropriate backend service. 
   - Provides a Swagger UI for API documentation. 
- **User Service:**
   - Handles user data.
   - Built with Node.js and connects to a PostgreSQL database.
- **Book Service:**
   - Manages book records.
   - Built with Node.js and connects to a MySQL database.
- **Author Service:**
   - Manages author data.
   - Built with Flask and connects to a MySQL database.
   
### Prerequisites
   - Docker 
   - Docker Compose 
   - Node.js (if running locally without Docker) 
   - Python (if running locally without Docker) 
   - MySQL 
   - PostgreSQL
   
## Getting Started

These instructions will cover usage information and for the docker-compose based setup.

### Installing

1. Clone the repository:
   ```sh
   git clone https://github.com/yunusefeyilmaz/microservices-architecture.git
   ```
2. Navigate to the project directory:
    ```sh
   cd microservices-architecture/MicroserviceArchitectureProject
   ```
3. Create a `.env` file in the every service directory and fill it with your database credentials and other configurations as needed:
     ```sh
    DB_USER=your_username
    DB_PASS=your_password
    DB_HOST=localhost
    DB_NAME=your_database
    DB_PORT=5432
   ```
4. Go `/MicroserviceArchitectureProject`. Build and Run the containers:
   ```sh
    docker-compose up --build
   ```
   
This command will build the Docker images for each service and start the containers.

### Database Setup

Each service in this project (User, Book, and Author services) requires a separate database. Below are the instructions to set up each database and initialize it with the necessary tables and data.

- **User Service Database Setup**
   - The User Service uses a PostgreSQL database.
   - ```sh
     CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL
     );
     ```
- **Book Service Database Setup**
   - The Book Service uses a MySQL database.
   - ```sh
     CREATE TABLE books (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL
     );
     ```
- **Author Service Database Setup**
   - The Book Service uses a MySQL database.
   - ```sh
     CREATE TABLE authors (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     nationality VARCHAR(255)
     );
     ```
- **Connecting Services to Databases**
  - Ensure each service is configured to connect to its respective database. This typically involves setting up database connection strings in your service configuration files or environment variables.

### Accessing the Services
- **API Gateway:** http://localhost:8080 
- **Swagger UI:** http://localhost:8080/api-docs 
- **User Service:** http://localhost:3001/users 
- **Book Service:** http://localhost:3002/books 
- **Author Service:** http://localhost:3003/authors

## Using the Swagger UI to Explore API Endpoints

The Swagger UI is an interactive API documentation that allows you to understand and interact with the API’s resources without having any of the implementation logic in place. It’s an easy way to visualize and test the various endpoints your microservices architecture provides.

### Accessing the Swagger UI

The Swagger UI for this project can be accessed at:

http://localhost:8080/api-docs

This URL will take you to a webpage hosted by the API Gateway that presents a visual documentation of all the available API endpoints.

### Features of Swagger UI
- Interactive Documentation: Browse through all available API routes, understand the required parameters, and the structure of response objects.
- Try it Out: You can execute requests against the API directly from the browser. For each endpoint, you can:
     - Select the `Try it out` button.
     - Fill in the required parameters and request body.
     - Send the request and view the response directly in the UI.

### Example of Making a Request

1. Navigate to the Endpoint: Choose the endpoint you want to test. For example, `/users` for user-related operations.
2. Try it Out: Click the `Try it out` button for that endpoint.
3. Enter Required Parameters: If the endpoint requires query parameters or a request body, fields will be available to enter these values.
4. Execute the Request: Hit the Execute button to send the request to the live API. The response will be shown below the button, including the status code, response body, and headers.

### Development

If you wish to run the services locally for development, ensure you have the necessary environments set up (Node.js for the Node applications and Python for the Flask application), and run each service independently. You will need to set up and connect to local databases or configure connections to remote databases.

### Contributors

[Yunus Efe YILMAZ](https://github.com/yunusefeyilmaz/)

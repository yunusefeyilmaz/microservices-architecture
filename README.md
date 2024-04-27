# Monolithic Architecture 

This project contains a Node.js application using Express.js framework that demonstrates a monolithic architecture for managing books, authors, and users. It includes basic CRUD operations and is designed to help understand how to build and structure a monolithic application. The application also features a simple load balancer that distributes incoming HTTP requests across two server instances.

![Screenshot 2024-04-25 135521](https://github.com/yunusefeyilmaz/microservices-architecture/assets/89478740/5b336e55-ce2f-4900-8e15-8b6c53090510)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js, npm, and PostgreSQL installed on your local machine. You can download and install Node.js and npm from [Node.js official website](https://nodejs.org/), and PostgreSQL from [PostgreSQL official website](https://www.postgresql.org/download/).

### Installing

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/microservices-architecture.git
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
### API Endpoints
**GET /users:** Fetch all users\
**POST /users/create:** Create a new user\
**GET /users/:id:** Fetch a single user by ID\
**GET /books:** Fetch all books\
**POST /books:** Add a new book\
**GET /authors:** Fetch all authors\
**POST /authors:** Add a new author

### Load Balancer
The load balancer listens on port 8080 and distributes requests randomly between two server instances running on ports 3000 and 3001.



## Microservice Architecture 

![image](https://github.com/yunusefeyilmaz/microservices-architecture/assets/89478740/7435a0e3-b1ed-44a8-b17d-5bc53e5eb8ed)


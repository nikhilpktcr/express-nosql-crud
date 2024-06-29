# express-nosql-curd

## Product CRUD API

This is a simple Express.js application that provides CRUD (Create, Read, Update, Delete) operations for products. The application is structured to separate routes, controllers, services and models for better maintainability and scalability.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (>=12.0.0) -- ES6 version is used
- npm (>=6.0.0)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nikhilpktcr/express-nosql-crud.git
cd express-nosql-crud
```

2. Install the dependencies:

```bash
npm install
```

3. Runnning the application

```bash
npm start
```

### Additional details

1. Need to be create and database using mongoDB
2. ODM- moongoose
3. You should create .env file and store database URL and PORT

### End-Points

1. GET /products : Retrieve all products
2. GET /products/:id : Retrieve a specific product by ID
3. POST /products : Create a new product
4. PUT /products/:id : Update an existing product by ID
5. DELETE /products/:id : Delete a product by ID

# NetSocial-API

## Description

This project is a simple social network API built with Node.js, Express, and MongoDB using Mongoose. It allows users to create an account, post thoughts, react to thoughts, and add friends.

Video Demenstration:
https://drive.google.com/file/d/17u8NfUHOZ5umOH5l0BZf1X_5Q3SPhVHn/view?usp=sharing

## Table of Contents

- [NetSocial-API](#netsocial-api)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Thoughts](#thoughts)
  - [Models](#models)
    - [User](#user)
    - [Thought](#thought)
    - [Reaction (Subdocument Schema)](#reaction-subdocument-schema)
  - [Seeding the Database](#seeding-the-database)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/social-network-api.git
   cd social-network-api
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Ensure MongoDB is installed and running on your local machine. The default connection string is `mongodb://localhost:27017/socialnetwork`.

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The API will be available at `http://localhost:3001`.

## API Endpoints

### Users

- **Get all users**

  ```http
  GET /api/users
  ```

- **Get a single user by ID**

  ```http
  GET /api/users/:id
  ```

- **Create a new user**

  ```http
  POST /api/users
  {
      "username": "username",
      "email": "email@example.com"
  }
  ```

- **Update a user by ID**

  ```http
  PUT /api/users/:id
  {
      "username": "newusername",
      "email": "newemail@example.com"
  }
  ```

- **Delete a user by ID**

  ```http
  DELETE /api/users/:id
  ```

- **Add a friend to a user's friend list**

  ```http
  PUT /api/users/:userId/friends/:friendId
  ```

- **Remove a friend from a user's friend list**
  ```http
  DELETE /api/users/:userId/friends/:friendId
  ```

### Thoughts

- **Get all thoughts**

  ```http
  GET /api/thoughts
  ```

- **Get a single thought by ID**

  ```http
  GET /api/thoughts/:id
  ```

- **Create a new thought**

  ```http
  POST /api/thoughts
  {
      "thoughtText": "This is a new thought",
      "username": "username"
  }
  ```

- **Update a thought by ID**

  ```http
  PUT /api/thoughts/:id
  {
      "thoughtText": "This is an updated thought"
  }
  ```

- **Delete a thought by ID**

  ```http
  DELETE /api/thoughts/:id
  ```

- **Add a reaction to a thought**

  ```http
  POST /api/thoughts/:thoughtId/reactions
  {
      "reactionBody": "Great thought!",
      "username": "username"
  }
  ```

- **Remove a reaction from a thought**
  ```http
  DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  ```

## Models

### User

- **username**: String, required, unique
- **email**: String, required, unique, must match a valid email format
- **thoughts**: Array of Thought references
- **friends**: Array of User references

### Thought

- **thoughtText**: String, required, between 1 and 280 characters
- **createdAt**: Date, default is the current date
- **username**: String, required
- **reactions**: Array of reaction subdocuments

### Reaction (Subdocument Schema)

- **reactionId**: Unique ID
- **reactionBody**: String, required, 1 to 280 characters
- **username**: String, required
- **createdAt**: Date, default is the current date

## Seeding the Database

To seed the database with initial data, run the following command:

```bash
node seed.js
```

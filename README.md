# BookishBliss Full Stack Web Application

## Overview

BookishBliss is a full-stack web application designed for book enthusiasts to explore, review, and share their favorite books with others. The platform provides features such as user profiles, book lists, reviews, and social interactions like following other users and liking books. The application is built with a React-based frontend and a Node.js backend, integrated with a MongoDB database.

## Technologies Used

### Front-End
- **React**: A JavaScript library for building user interfaces using a component-based architecture.
- **JavaScript (ES6+)**: The language used for implementing dynamic and interactive features.
- **CSS**: Styles the user interface, ensuring a responsive and visually appealing design.
- **React Router**: Manages navigation within the application, allowing seamless transitions between pages.
- **Axios**: Used for making HTTP requests to interact with the backend API.
- **Jest**: A testing framework for writing and running tests on React components.

### Back-End
- **Node.js**: A JavaScript runtime used for building the server-side of the application.
- **Express.js**: A web application framework for Node.js, used to create APIs and handle HTTP requests and responses.
- **MongoDB**: A NoSQL database used to store user data, book lists, reviews, and other related data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and session management.

## Key Functionalities

### Front-End (React)
1. **User Interface**:
   - **Responsive Design**: The app is designed to be fully responsive, providing a consistent experience across desktops, tablets, and mobile devices.
   - **Component-Based Architecture**: The UI is divided into reusable components, such as navigation bars, book cards, and user profiles, promoting maintainability and scalability.

2. **Book and Review Management**:
   - **Book Lists**: Users can browse, create, and manage their book lists, adding books they are currently reading, have read, or wish to read.
   - **Book Reviews**: Users can write reviews for books, view reviews from others, and like or comment on reviews.

3. **User Profiles and Social Features**:
   - **Profile Pages**: Each user has a profile page displaying their book lists, reviews, followers, and the users they are following.
   - **Following System**: Users can follow and unfollow other users, allowing them to stay updated on the latest books and reviews from their network.
   - **Likes and Favorites**: Users can like books and reviews, adding them to their favorites for quick access later.

4. **Routing & Navigation**:
   - **React Router Integration**: Smooth navigation between different views, such as home, profile, book details, and search pages.
   - **Dynamic Routing**: Enables accessing specific book details, user profiles, and lists using dynamic URLs.

5. **State Management**:
   - **React State & Props**: Manages local component states and passes data between components using props.
   - **Context API**: For global state management, such as user authentication and session data.

6. **API Integration**:
   - **Axios**: Used for making HTTP requests to interact with the backend API for data retrieval, creation, and updates.
   - **Error Handling**: Implements error handling for API calls to manage network failures and invalid requests.

### Back-End (Node.js)
1. **Server Setup**:
   - **Express.js**: Manages HTTP requests, routing, and middleware, providing the backbone for the backend.
   - **app.js**: The main entry point for the server, configuring middleware, routes, and database connections.

2. **Controllers**:
   - **User Controller**: Manages user-related operations such as registration, login, profile updates, and password management.
   - **Booklist Controller**: Handles CRUD operations for managing book lists, including adding, updating, and deleting books.
   - **Review Controller**: Manages CRUD operations for book reviews, allowing users to create, view, and delete reviews.
   - **Follow Controller**: Handles the following and unfollowing of users, managing social interactions on the platform.

3. **Data Access (DAO)**:
   - **User Model**: Defines the schema and data structure for user information using Mongoose.
   - **Booklist Model**: Defines the schema for book lists, storing information such as titles, authors, and user associations.
   - **Review Model**: Defines the schema for reviews, associating reviews with specific books and users.

4. **Database**:
   - **MongoDB**: Stores all persistent data, including users, books, reviews, and social interactions.
   - **Mongoose**: Facilitates interactions with MongoDB, enforcing schemas and providing an abstraction layer for database operations.

5. **Authentication**:
   - **JWT**: Implements secure authentication, generating tokens on user login and validating them for protected routes.

## Design Patterns

### 1. **MVC (Model-View-Controller)**
   - **Description**: The MVC pattern is used to organize the application’s structure by separating data (Model), user interface (View), and user input (Controller).
   - **Implementation**:
     - **Model**: Implemented using Mongoose models, such as `User`, `Booklist`, and `Review`.
     - **View**: Represented by the React components on the frontend.
     - **Controller**: Managed by Express.js controllers, such as `user.js`, `booklist.js`, and `review.js`, handling the logic and routing of HTTP requests.

### 2. **Factory Pattern**
   - **Description**: A design pattern used to create objects without specifying the exact class of the object that will be created.
   - **Implementation**: Applied in the creation of Mongoose models where objects (e.g., user, booklist) are created based on schema definitions.

### 3. **Singleton Pattern**
   - **Description**: Ensures a class has only one instance and provides a global point of access to it.
   - **Implementation**: Used in database connection management, ensuring only one instance of the database connection is active.

### 4. **Observer Pattern**
   - **Description**: Defines a dependency between objects so that when one object changes state, its dependents are notified.
   - **Implementation**: React's state management, where components observe changes in state and re-render accordingly.

## Design Architecture

### 1. **Client-Server Architecture**
   - **Description**: The application follows a client-server architecture where the front-end (React) acts as the client and the back-end (Node.js) serves as the server. The client sends HTTP requests to the server, which processes them and sends back responses.
   - **Communication**: The front-end and back-end communicate via RESTful API endpoints.

### 2. **RESTful API Design**
   - **Description**: The back-end provides a set of RESTful API endpoints that allow the front-end to perform operations like creating, reading, updating, and deleting resources (e.g., users, books, reviews).
   - **Implementation**: The controllers handle these requests, interacting with the database through Mongoose and returning JSON responses to the client.

### 3. **Component-Based Architecture (Front-End)**
   - **Description**: The front-end is structured using a component-based architecture. Each UI element or feature is encapsulated within a component, promoting reusability and modularity.
   - **Implementation**: React components manage their own state and lifecycle, rendering UI elements based on props and state changes.

### 4. **Service Layer (Back-End)**
   - **Description**: The service layer encapsulates business logic and acts as an intermediary between controllers and the data access layer (DAOs). This architecture ensures the separation of concerns, promoting code reuse and easier testing.
   - **Implementation**: While the service layer is implicit in this project, it can be further developed to handle complex business logic separate from the controllers.

## Installation

### Front-End
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd web-dev-project-bookishbliss-frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Front-End**:
   ```bash
   npm start
   ```

### Back-End
1. **Navigate to the Server Directory**:
   ```bash
   cd web-dev-project-bookishbliss-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/bookishbliss
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Server**:
   ```bash
   node app.js
   ```

### Running the Full Stack Application
1. Start the back-end server.
2. Start the front-end development server.
3. Open `http://localhost:3000` to view the application.

## Conclusion

BookishBliss is a robust full-stack web application that combines a React front-end with a Node.js back-end, offering a comprehensive platform for book lovers. With a well-structured architecture, the use of design patterns like

 MVC and Factory, and a clean separation of concerns, this project serves as an excellent foundation for building scalable and maintainable web applications.

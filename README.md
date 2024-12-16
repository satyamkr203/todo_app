
# Todo App Router Documentation

This project is a simple Todo application that uses a file-based storage system (`todo.json`) and provides API endpoints for managing tasks using Node.js and Express.js.

## Routes

1. **Get All Todos**  
   `GET /todo`  
   Retrieves all todos.

2. **Create a Todo**  
   `POST /todo/create`  
   Adds a new todo.  
   **Request Body:**  
   ```json
   {
     "title": "Your todo title",
     "description": "Your todo description"
   }
   ```

3. **Get Todo by ID**  
   `GET /todo/:id`  
   Retrieves a todo by its unique ID.

4. **Delete Todo by ID**  
   `DELETE /todo/delete/:id`  
   Deletes a specific todo.

5. **Update Todo by ID**  
   `PUT /todo/update/:id`  
   Updates a todo.  
   **Request Body:**  
   ```json
   {
     "title": "Updated title",
     "description": "Updated description"
   }
   ```

6. **Mark Todo as Complete**  
   `PATCH /todo/:id/complete`  
   Marks a todo as complete.

7. **Mark Todo as Incomplete**  
   `PATCH /todo/:id/incomplete`  
   Marks a todo as incomplete.

8. **Get Todos by Status**  
   `GET /todo/status/:status`  
   Retrieves todos by their status (e.g., `complete` or `incomplete`).

## How to Run
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Test the API using tools like Postman.

## Dependencies
- Node.js
- Express.js


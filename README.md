# G09-Project-Canopy-Connect-PreHack-2025
## :pushpin: Project Canopy Connect

Canopy Green is designed to connect people who are passionate about environmental conservation, 
creating a community where users can share experiences, 
discuss ecological topics, and collaborate on green initiatives.
Many people find it tough to discover reliable, well-organized, and exciting online resources dedicated to trees and environmental sustainability. What’s more, there’s a serious lack of interactive spaces where eco-minded individuals can connect, swap stories, and uplift each other’s green goals.

## :rocket: Getting Started
**Clone the repository**: 
```bash 
 git clone https://github.com/CSC105-2024/G09-Project-Canopy-Connect-PreHack-2025.git 
 cd G09-Project-Canopy_Connect-PreHack-2025
```

## :hammer: Frontend - React

### :wrench: Tech Stack

- React
- Axios
- React Router DOM
- Tailwind CSS
- Other dependencies...

### :rocket: Getting Started - React Client

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The client will be running on [http://localhost:5173](http://localhost:5173) (or similar, depending on your setup).

---

## :wrench: Backend - Node.js

### :hammer_and_wrench: Tech Stack

- Node.js
- MySQL 
- JWT (JSON Web Token)
- bcrypt
- Cookies

### :electric_plug: API Endpoints

| Method | Endpoint                     | Description                         |
|--------|------------------------------|-------------------------------------|
| GET   | `/user/decodeCookie`          | Decode the cookie's JWT token       |
| POST  | `/user/register`              |Create new user account              |
| POST  | `/user/login`                 | To log in an account                |
| PATCH | `/user/updateProfile`         | Update user's profile               |
| PATCH | `/user/updateUsername`        | Update user's username              |
| PATCH | `/user/updatePassword`        | Update user's password              |
| PATCH | `/user/updateEmail`           | Update user's email                 |
| Delete| `/user/logout`                | To logout the account               |
| POST  | `/post/CreatePost`	           | Create a new post	                  |
| POST	 | `/post/:postId/CreateComment`	| Create a new comment on a post	     |
| POST  |	`/post/:postId/Like`	         | Like or unlike a post	              | 
| PUT	  | `/post/:id`	                  | Update an existing post	            |
| DELETE|	`/post/DeletePost`	           | Delete a post	                      |
| GET   |	`/post/GetPosts`	             | Get all posts	                      |
| GET	  | `/post/:tagName/GetPostsByTag`| Get posts by a specific tag	        | 
| GET	  | `/post/:postId/GetComments`	  | Get all comments for a post	        |
| GET	  | `/post/tags`	                 | Get all available tags	             |
| GET	  | `/post/:postId/GetLikes`	     | Get all likes for a post	           |

### :rocket: Getting Started - Node.js Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the following variables:
   ```
   DATABASE_URL = "(Your database URL)"
   SHADOW_DATABASE_URL = "(Your shadow database URL)"
   JWT_SECRET= (secret)
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The server will be running on [http://localhost:8000](http://localhost:8000)

# mean-stack

## The M.E.A.N Stack
* MongoDB (a MongoDB ORM to help communicate with the database)
* Express (a Node.js web application framework)
* AngularJS
* Node.js

### Backend
* Node.js with Express and MongoDB.
* Handled in `server.js`, `app/` directory, `config/` directory.

### RESTFul API
| HTTP Method  | URL                | Description          |
| ------------ | ------------------ | -------------------- |
| GET          | /api/nerds         | Get all of the nerds |
| POST         | /api/nerds         | Create a single nerd |
| DELETE       | /api/nerds:nerd_id | Delete a single nerd |
| GET          | /api/nerds:nerd_id | Get a single nerd    |
| PUT          | /api/nerds:nerd_id | Update a nerd        |

### Frontend
* AngularJS Single Page Application (with bower to manage the frontend dependencies, and Bootstrap to make pretty).
* Handled in `public/` directory.

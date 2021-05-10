# TenantPass test assignment

### Getting started

Your goal is to build a messaging system on top of the existing users service.

The app should consist of the following:

- A web-based interface built with either Angular or React (preferably in TypeScript)
- A backend service build with Nest.js

To get started, fork this repository and clone it. After that, generate the projects using the CLIs provided by Nest,
Angular, and React. Try to follow a monorepo git pattern for this assignment.

After completion, please create a pull request from your fork to the original repository.

### Pre-requisites

- Git
- Docker
- Docker Compose
- Node.js

### Users Service

A users service is provided with this repository. It is provided both as source as well as a Docker image. This service
should not be changed. By default, it listens on port `3000`.

The service has the following API:

`GET /users` - List all users

Response:

```json
{
  "users": [
    {
      "id": "e72c1043-d0b2-4a7f-8546-b36a7f88ab5e",
      "username": "john.doe",
      "name": "John Doe",
      "color": "123ccc"
    }
  ]
}
```

`POST /users` - Create a user

Request:

- Username must be an ASCII string
- Username must be unique
- Name must be a string
- Color is optional
- Color must be a HEX color if specified

```json
{
  "color": "123ccc",
  "username": "john.doe",
  "name": "John Doe"
}
```

Response:

```json
{
  "user": {
    "id": "e72c1043-d0b2-4a7f-8546-b36a7f88ab5e",
    "username": "john.doe",
    "name": "John Doe",
    "color": "123ccc"
  }
}
```

`PUT /users/:id` - Update a user

Request:

- Username is optional
- Name is optional
- Color is optional
- Username must be an ASCII string if specified
- Username must be unique if specified
- Name must be a string if specified
- Color must be a HEX color if specified

```json
{
  "color": "123ccc",
  "username": "john.doe",
  "name": "John Doe"
}
```

Response:

```json
{
  "user": {
    "id": "e72c1043-d0b2-4a7f-8546-b36a7f88ab5e",
    "username": "john.doe",
    "name": "John Doe",
    "color": "123ccc"
  }
}
```

`GET /users/by-username/:username` - Get user by username

Response:

```json
{
  "users": {
    "id": "e72c1043-d0b2-4a7f-8546-b36a7f88ab5e",
    "username": "john.doe",
    "name": "John Doe",
    "color": "123ccc"
  }
}
```

`GET /users/by-id/:id` - Get user by id

Response:

```json
{
  "users": {
    "id": "e72c1043-d0b2-4a7f-8546-b36a7f88ab5e",
    "username": "john.doe",
    "name": "John Doe",
    "color": "123ccc"
  }
}
```

## Backend (Nest.js)

[Nest.js documentation](https://nestjs.com)

Build a REST-based micro-service that adds support for messaging. The project should be generated using the CLI provided
by Nest.js. A Dockerfile and a docker-compose service declaration should also be created for this service.

The users service should be used for working with users. If a user does not exist with a specific username, it must be
created. A user can also have a color which should be used for profile customization. API communication should be
REST-based, however SSE or WebSockets can be used for real-time message delivery.

## Frontend (Angular/React)

[Figma Link](https://www.figma.com/file/uEEdsjyBjrRzqYOscRWrUG/TenantPass-Test-Assignment)

Build a web UI with either Angular or React. The design doesn't have to be as provided, however it should be
functionally the same. No CSS libraries should be used, however CSS preprocessors are allowed. For bonus points, create
a Dockerfile and docker-compose service declaration which builds the project and serves it with nginx.

The UI consists of a join page, and a chat page. When joining the chat, only the username should be asked. If the user
does not yet exist, the name should also be asked from the user.

After joining, present the user with the chat page where the user can send messages to others. Messages can be
transmitted either with long-polling or SSE/WebSockets.

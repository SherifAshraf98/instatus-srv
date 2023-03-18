## Instatus (Activity Log task - Backend)

Backend for a webapp that lists the activities made by users, search for activities, and exports data to csv.

## Developed using these technologies:
* Node.js
* Express
* Postgres
* Typescript
* Prisma (ORM): Handles the logic required to interact with database.
* AWS RDS: Hosts our postgres database.

## Project Features

* List all activities made by users to check team's activity, sorted by chronologica order (newest to oldest).
* Search for activities by actor name, actor email, and activity type.
* Export all activities to CSV file.

## Frontend Link:

<a href="https://instatus-web.vercel.app/">https://instatus-web.vercel.app/</a>

## Available Endpoints
1. POST /events
* You can find example for the body in the postman collection
2. GET /events
* supported query params: page, pageSize, search, actorId, targetId, actionId
* Note that actionId supports only these values: login_succeeded, logout_succeeded, invited_teammate, searched_activity_log_events

## Postman Collection
You will find here the 2 endpoints with examples
<a href="https://www.postman.com/sherif-ashraf/workspace/instatus/collection/10981238-744ff92e-be97-42f6-8637-1be04913abe7?action=share&creator=10981238">Postman Collection</a>

## ERD
![ERD - Users, Events, Event Types](https://i.ibb.co/VLS9RPC/Screen-Shot-2023-03-18-at-3-28-10-PM.png)

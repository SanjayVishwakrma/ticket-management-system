# ticket-management-system

Ticket Management System (Node.js & MongoDB)

    A simple RESTful API for managing support tickets. This API allows users to create, read, update, and delete tickets, making it easy to track and manage support requests.

Features:
    Create a new support ticket
    Retrieve all support tickets
    Retrieve a single ticket by its unique ID
    Update a ticket (title, description, status)
    Delete a ticket by its unique ID



Table of Contents:

    Prerequisites
    Setup Instructions
    API Endpoints
    Validation and Error Handling





Prerequisites:
    Node.js (v12+)
    MongoDB (ensure MongoDB is installed and running)




Setup Instructions:

        1. Clone the repository:


            cd ticket-management-system

        2. Install dependencies:

            npm install

        3. Start MongoDB:

            Ensure your MongoDB service is running locally (mongod --dbpath /path/to/db)
            The default MongoDB connection string is mongodb://localhost:27017/ticketDB

        4. Run the server:
            npm run server


API Endpoints:


        1. create tickets

            http://localhost:3000/addTickets

            body data 
                    {
                        "title": "shi Ticket",
                        "description": "shi ka Ticket"
                    }


            resonse 
                    {
                        "title": "shi Ticket",
                        "description": "shi ka Ticket",
                        "status": "open",
                        "_id": "66f037e39a127e583f24875b",
                        "createdAt": "2024-09-22T15:29:39.395Z",
                        "updatedAt": "2024-09-22T15:29:39.396Z",
                        "__v": 0
                    }

        2. all tickets

            http://localhost:3000/tickets

            resonse
                [
                    {
                        "_id": "66f037999a127e583f248757",
                        "title": "train Ticket",
                        "description": "train ka Ticket",
                        "status": "open",
                        "createdAt": "2024-09-22T15:28:25.151Z",
                        "updatedAt": "2024-09-22T15:28:25.164Z",
                        "__v": 0
                    },
                    {
                        "_id": "66f037d59a127e583f248759",
                        "title": "arolain Ticket",
                        "description": "arolain ka Ticket",
                        "status": "open",
                        "createdAt": "2024-09-22T15:29:25.331Z",
                        "updatedAt": "2024-09-22T15:29:25.332Z",
                        "__v": 0
                    },
                    {
                        "_id": "66f037e39a127e583f24875b",
                        "title": "Updated Title",
                        "description": "Updated Description",
                        "status": "in-progress",
                        "createdAt": "2024-09-22T15:29:39.395Z",
                        "updatedAt": "2024-09-22T15:33:28.875Z",
                        "__v": 0
                    }
                ]

        3.  ticket by id

            http://localhost:3000/tickets/66f037e39a127e583f24875b

            resonse 

            {
                "_id": "66f037e39a127e583f24875b",
                "title": "shi Ticket",
                "description": "shi ka Ticket",
                "status": "open",
                "createdAt": "2024-09-22T15:29:39.395Z",
                "updatedAt": "2024-09-22T15:29:39.396Z",
                "__v": 0
            }

            
        4.  update ticket status

            http://localhost:3000/tickets/66f037e39a127e583f24875b

            body data 

            {
                "title": "Updated Title",
                "description": "Updated Description",
                "status": "in-progress"
            }

            resonse

            {
                "_id": "66f037e39a127e583f24875b",
                "title": "Updated Title",
                "description": "Updated Description",
                "status": "in-progress",
                "createdAt": "2024-09-22T15:29:39.395Z",
                "updatedAt": "2024-09-22T15:33:28.875Z",
                "__v": 0
            }


        5.  delete tickets

            http://localhost:3000/tickets/66f037d59a127e583f248759

            resonse 

            {
                "message": "Ticket deleted successfully"
            }


Validation and Error Handling:

    Validation:
        Ticket creation requires title and description fields.
        The status field defaults to "open" and can later be updated to "in-progress" or "closed".
        MongoDB automatically assigns a unique _id to each ticket.

    Error Handling:

        If a ticket ID is not found, a 404 Not Found error is returned.
        Invalid ticket IDs return a 400 Bad Request error.
        Other server errors (e.g., MongoDB connection issues) return a 500 Internal Server Error with a relevant error message. 

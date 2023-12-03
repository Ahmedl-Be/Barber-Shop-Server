# Barber Shop Backend
This repository contains the backend for a barber shop application built with Node.js, Express, and MongoDB.

## Features

### For Users

1. **Send Message to Owner**: `/api/userMsg` - Users can send messages with their details to the owner.
2. **User Authentication**: `/api/users/login`, `/api/users/register` - Users can log in and register on the website.
3. **Reservation Booking**: `/api/reservation/book` - Users can make reservations for a specific hour on a specific day.
4. **Fetch Available Services**: `/api/users/services` - Users can fetch all the services offered by the website.

### For Owner

1. **Owner Authentication**: `/api/owner/login` - Owners can log in using a specific email and password.
2. **Get All Messages**: `/api/userMsg` - Owners can retrieve all messages sent by users.
3. **Get All Users**: `/api/users/` - Owners can access a list of all users registered on the website.
4. **Get All Reservations**: `/api/reservation/booked-reservations` - Owners can retrieve all reservations made by users.
5. **Cancel Reservation**: `/api/reservation/cancel` - Owners can cancel reservations made by users.

## Prerequisites

Ensure you have Node.js and MongoDB installed on your system.

## Getting Started

To get started with the API, follow these steps:

1. Access the deployed version of the application at the base URL: https://barber-shop-0w9x.onrender.com.
2. BASE_URL : https://crud-api-with-login-register.onrender.com
3. Interact with the API by making HTTP requests to specific routes: {{BASE_URL}}/Api-End-Point

## API Endpoints

| Endpoint | HTTP Method | Description |
|----------|-------------|-------------|
| `/api/userMsg` | POST | Receive messages from users |
| `/api/users/login` | POST | User login |
| `/api/users/register` | POST | User registration |
| `/api/reservation/available-hours/:date` | GET | Retrieve available hours |
| `/api/reservation/book` | POST | Book a reservation |
| `/api/users/services` | GET | Retrieve available services |
| `/api/owner/login` | POST | Owner login |
| `/api/userMsg` | GET | Get messages (protected to owner) |
| `/api/users/` | GET | Get all users |
| `/api/reservation/booked-reservations` | GET | Get all reservations |
| `/api/reservation/cancel` | DELETE | Cancel a reservation |


## Response Format (JSend)

This API follows the JSend specification for response format. Responses will be in the following format:

{
  "status": "success",
  "data": {
    // Your response data here
  }
}

`status` can be "success," "fail," or "error" to indicate the outcome of the request.
`data` contains the response data.

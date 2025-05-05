# API Documentation

## Authentication

All API endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## Base URL

```
https://api.vanacheckin.com/v1
```

## Endpoints

### Authentication

#### POST /auth/login
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Users

#### GET /users/me
Get current user's profile.

**Response:**
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "string",
  "companyId": "string"
}
```

### Clients

#### GET /clients
List all clients for the authenticated coach.

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optional)

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "status": "string",
      "lastCheckIn": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

#### POST /clients
Create a new client.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "programId": "string"
}
```

### Programs

#### GET /programs
List all programs.

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "sections": [
        {
          "id": "string",
          "title": "string",
          "questions": [
            {
              "id": "string",
              "text": "string",
              "type": "string"
            }
          ]
        }
      ]
    }
  ]
}
```

### Check-ins

#### POST /check-ins
Submit a new check-in.

**Request Body:**
```json
{
  "programId": "string",
  "answers": [
    {
      "questionId": "string",
      "value": "string"
    }
  ]
}
```

#### GET /check-ins/:id
Get a specific check-in.

**Response:**
```json
{
  "id": "string",
  "programId": "string",
  "clientId": "string",
  "answers": [
    {
      "questionId": "string",
      "value": "string"
    }
  ],
  "submittedAt": "string",
  "feedback": "string"
}
```

### Analytics

#### GET /analytics/client/:id
Get analytics for a specific client.

**Query Parameters:**
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)

**Response:**
```json
{
  "checkInCompliance": "number",
  "progressMetrics": {
    "metric1": "number",
    "metric2": "number"
  },
  "aiInsights": [
    {
      "type": "string",
      "message": "string"
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "string",
  "message": "string"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in all responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1620000000
``` 
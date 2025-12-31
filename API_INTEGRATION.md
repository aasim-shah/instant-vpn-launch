# API Integration Documentation

## Overview

This project uses a production-ready API integration with Axios for making HTTP requests to the backend server.

## API Structure

### 1. **Base API Client** (`src/lib/api.ts`)
- Centralized axios instance with global configuration
- Request/response interceptors for logging and error handling
- Automatic auth token injection from localStorage
- Environment-based configuration

### 2. **Survey Service** (`src/services/surveyService.ts`)
- Type-safe survey submission service
- Clean API methods for survey operations
- Full TypeScript support with interfaces

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://192.168.18.68:4000
```

The API base URL defaults to `http://192.168.18.68:4000` if not specified.

### API Endpoint

**POST** `/api/v1/customer-survey`

## Usage Example

The survey form automatically handles the submission:

```typescript
import { surveyService } from '@/services/surveyService';

// Submit survey data
const response = await surveyService.submitSurvey({
  businessInfo: {
    companyName: "company name",
    businessStage: "mvp",
    companySize: "solo",
    targetMarket: "global",
    vpnBusinessType: "enterprise",
    email: "user@example.com"
  },
  applicationDetails: { /* ... */ },
  infrastructure: { /* ... */ },
  security: { /* ... */ },
  billing: { /* ... */ },
  futurePlans: { /* ... */ }
});
```

## Features

### ✅ Request Interceptor
- Automatically adds auth tokens from localStorage
- Logs requests in development mode
- Custom headers (Content-Type: application/json)

### ✅ Response Interceptor
- Logs responses in development mode
- Automatic error handling with user-friendly messages
- Handles network errors gracefully

### ✅ Error Handling
The integration handles various error scenarios:
- **400 Bad Request**: Validation errors
- **401 Unauthorized**: Token expired
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **500 Server Error**: Internal server error
- **Network Errors**: Connection issues

### ✅ User Feedback
Uses `sonner` toast notifications for:
- Success confirmations
- Error messages
- Network issues
- Validation errors

## Development

### Testing the API

1. Start your backend server on `http://192.168.18.68:4000`
2. Fill out the survey form in the application
3. Check the browser console for request/response logs (development mode only)
4. Toast notifications will show success/error messages

### Production Build

For production, set the environment variable:

```bash
VITE_API_BASE_URL=https://your-production-api.com
```

Then build:

```bash
npm run build
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Survey submitted successfully",
  "data": { /* optional data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "email": ["Email is required"]
  }
}
```

## Security

- Sensitive data is never logged in production
- HTTPS recommended for production
- Auth tokens stored securely in localStorage
- CORS headers should be configured on the backend

## Extending the API

To add more API endpoints, follow this pattern:

```typescript
// src/services/yourService.ts
import { api } from '@/lib/api';

export const yourService = {
  getSomething: async (id: string) => {
    return await api.get(`/api/v1/your-endpoint/${id}`);
  },
  
  createSomething: async (data: YourData) => {
    return await api.post('/api/v1/your-endpoint', data);
  }
};
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend allows requests from your frontend origin:
```
Access-Control-Allow-Origin: http://localhost:8080
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Network Timeout
The default timeout is 30 seconds. Modify in `src/lib/api.ts` if needed:
```typescript
const API_TIMEOUT = 30000; // 30 seconds
```

### Authentication
To add authentication, store the token after login:
```typescript
localStorage.setItem('auth_token', 'your-jwt-token');
```

The API client will automatically include it in subsequent requests.

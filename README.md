# Service Booking UI

Frontend application responsible for user interaction with the authentication system, providing login, registration and session validation flows integrated with the backend API.

## Tech Stack

- React (component-based UI)
- React Router DOM (client-side routing)
- JWT Decode (token parsing and user context)
- React Icons (UI elements)
- CSS (layout and styling)

## Application Flow

- User accesses the application
- User logs in using valid credentials
- Backend returns a JWT token
- Token is stored on the client
- User name is extracted from the token and displayed in the header
- Token validity is checked on each page navigation
- Token expires after 1 hour or is removed on logout
- User can register if no account exists

## Navigation Notes

User can navigate through Home, Services and Appointments pages. Some pages are placeholders and not fully implemented.

## Features

- User login via backend authentication API
- User registration with username and email validation
- Automatic token validation during navigation
- Logout functionality
- Personalized header greeting
- Footer with professional contact links

## API Integration

- REST communication with backend
- JWT sent via Authorization header
- Redirection to login on invalid or expired token

## Error Handling

- Invalid credentials
- Existing username or email
- Expired or invalid JWT
- Unauthorized access handling

## UI Components

- Login Form
- Registration Form
- Header
- Footer with professional links

## Security Considerations

- JWT-based authentication
- Token validation on navigation
- No sensitive data stored in plain text

## Testing (Planned)

- Manual validation of authentication flows
- Future automated UI tests

## Deployment (Planned)

- Environment-based API configuration
- Static frontend hosting

## Known Limitations

- Simplified UI
- No global state management
- Placeholder pages

## Installation

```bash
npm install
npm run dev
```

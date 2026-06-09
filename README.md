# LetMeSee

Typescript mongodb stats viewer.

## Configuration

The application reads the following environment variables:

- `SESSION_SECRET` (required in production): secret used to sign cookies and sessions.
- `MONGODB_CONNECTION` (optional): MongoDB connection string. Defaults to `mongodb://localhost:27017/lms` for local development.

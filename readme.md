# Telus Transcription Node

**Telus Transcription Node** is a backend service for managing audio
transcription workflows. It integrates with a PostgreSQL database and uses
WebSockets for audio and text streaming. This service supports SSL for secure
communication and provides configurable options for local development.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Database Initialization](#database-initialization)
- [Test Data](#test-data)
- [Running the Project](#running-the-project)

---

## Project Overview

**Telus Transcription Node** facilitates the handling and streaming of audio for
transcription purposes and transcribed text. The key features include:

- **Database Management**: PostgreSQL as a storage for configurations,
  connection data and transcription results.
- **WebSocket Support**: For streaming audio from producers to server and
  transcribed text from server to consumers.
- **SSL Configuration**: Optional support for secure HTTP and WebSocket
  communication.

## Prerequisites

Ensure you have the following tools installed:

- **Node.js** (v20 or later)
- **npm** (v10 or later)
- **PostgreSQL** (v16 or later)

Optional tools:

- **Nodemon** (for easier local development)

## Setup

Follow these steps to set up and run the project:

1. **Clone the repository**:
   ```sh
   git clone git@github.com:utter-one/telus-vp.git
   cd telus-vp
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Create environment file**: Create a `.env` file based on `.env.template`:
   ```sh
   cp .env.template .env
   ```
   Update the `.env` file with your PostgreSQL connection string and other
   required values.

4. **Initialize the database**: Run the following command to sync database
   schema:
   ```sh
   node --enable-source-maps --watch --env-file=.env --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts --sync-db
   ```

## Environment Variables

Create a `.env` file based on the provided `.env.template`. Below is the list of
environment variables and their purposes:

```
POSTGRES_CONNECTION_STRING=postgres://username:password@localhost:5432/database_name # Connection string for the PostgreSQL database.
EXPRESS_PORT=3000                         # Port for express server
HTTP_SSL_CERT_PATH=./ssl/cert.pem         # (Optional) Path to SSL certificate for Express
HTTP_SSL_KEY_PATH=./ssl/key.pem           # (Optional) Path to SSL key for Express
WS_BASE_URL=https://localhost             # Base URL for WebSocket
WS_PRODUCER_PORT=8081                     # WebSocket port for audio producer
WS_CONSUMER_PORT=8082                     # WebSocket port for audio consumer
WS_SSL_CERT_PATH=./ssl/ws-cert.pem        # (Optional) Path to SSL certificate for WebSocket
WS_SSL_KEY_PATH=./ssl/ws-key.pem          # (Optional) Path to SSL key for WebSocket
LOCAL_AUDIO_DIR=./audio                   # Directory to store temporary audio files
```

**Note**: If SSL paths (`HTTP_SSL_*` or `WS_SSL_*`) are not set, the servers
will run in an unsecure HTTP/WebSocket mode.

## Database Initialization

The database needs to be initialized before running the project:

- Run the following command to sync the database schema:
  ```sh
  node --enable-source-maps --watch --env-file=.env --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts --sync-db
  ```

## Test Data

If you need test data, follow these steps:

1. Open `sql/test-data.sql`.
2. Replace placeholders `AZURE_KEY`, `KEY_ID`, `ACCESS_KEY`, and `BUCKET_NAME`
   with your test credentials and S3 bucket name.
3. Execute the script against your database.
4. Skip the first line of the SQL script if the `public` schema already exists.

## Running the Project

Once the setup is complete, you can run the project locally:

### Standard Run

```sh
node --enable-source-maps --watch --env-file=.env --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts
```

### Using Nodemon (Recommended for Development)

Install nodemon globally if not already installed:

```sh
npm i -g nodemon
```

Run the project using nodemon:

```sh
nodemon
```

If required, update the `nodemon.json` file to specify the correct `.env` file.

FROM node:20.11.1

WORKDIR /telus-vp

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies using regular npm install
RUN npm install

# Install ts-node globally
RUN npm i -g ts-node

# Copy the rest of the application
COPY . .

# Create directory for audio files
RUN mkdir -p ./audio

# Create directories for SSL certificates
RUN mkdir -p ./ssl ./certifcate

# Set permissions
RUN chmod +x run.sh

# Expose the port used by the Express server
EXPOSE 8001

ENTRYPOINT ["sh", "run.sh"]
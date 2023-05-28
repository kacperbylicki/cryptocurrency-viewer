# Cryptocurrency app

## Project name & pitch

Cryptocurrency app is an application that allows tracking cryptocurrency data and provides access to the latest news from the world of cryptocurrencies. With this app, users can easily monitor their favorite cryptocurrencies, view price charts, check rankings, and stay up to date with the most important information from the world of cryptocurrencies.

### Key Features

1.  **Registration and login** <br /> 
    The app enables users to register and log in to their accounts. After logging in, they have access to personalized features and data.
2.	**Favorite cryptocurrencies** <br />
    After logging in, users can add their favorite cryptocurrencies to a favorites list. These selected cryptocurrencies will be displayed on the main dashboard, allowing for quick and easy tracking of their prices and statistics.
3.	**Price charts** <br />
    The app provides interactive price charts for the selected cryptocurrency. Users can view price history over different time periods, analyze market trends, and make informed investment decisions.
4.	**Cryptocurrency rankings** <br />
    The app provides cryptocurrency rankings based on their market positions. Users can see which cryptocurrencies have the highest market capitalization and are most significant in the world of cryptocurrencies.
5.	**Cryptocurrency news** <br />
    The app gathers the latest news and information from the world of cryptocurrencies. Users can browse various articles, market analyses, and updates related to their favorite cryptocurrencies. This allows them to stay up to date and make informed investment decisions.

## App Layout

The application is fully responsive. It was designed and programmed in accordance with the mobile first principle. Below are screenshots of the desktop version:


## Technologies

**Frontend:** React, TypeScript, Vite, SCSS, React Query, Context API <br />
**Backend:** 

## Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- [Turbo Repo](https://turbo.build/repo/docs/installing)

## Project Setup

1. Clone the repository

   ```
   git clone https://github.com/kacperbylicki/cryptocurrency-viewer
   ```

2. Navigate to the project directory

   ```
   cd cryptocurrency-viewer
   ```

3. Install Turbo

   ```
   yarn global add turbo
   ```

4. Install and build the project dependencies using Turbo

   ```
   yarn install && yarn build
   ```

5. Fill .env file with the required environment variables

   ```
   cp .env.example .env
   ```

## Docker Setup

1. Build and run the Docker-Compose setup

   ```
   docker-compose build && docker-compose up -d
   ```

You should now be able to access the frontend app at http://localhost:8080.

## Testing

To run the tests, use the following command:

```
yarn test:ci
```
# Cryptocurrency app

## Project name & pitch

Cryptocurrency app is an application that allows tracking cryptocurrency data and provides access to the latest news from the world of cryptocurrencies. With this app, users can easily monitor their favorite cryptocurrencies, view price charts, check rankings, and stay up to date with the most important information from the world of cryptocurrencies.

### Key Features

1.  **Registration and login**

    The app enables users to register and log in to their accounts. After logging in, they have access to personalized features and data.

2.  **Favorite cryptocurrencies**

    After logging in, users can add their favorite cryptocurrencies to a favorites list. These selected cryptocurrencies will be displayed on the main dashboard, allowing for quick and easy tracking of their prices and statistics.

3.  **Price charts**

    The app provides interactive price charts for the selected cryptocurrency. Users can view price history over different time periods, analyze market trends, and make informed investment decisions.

4.  **Cryptocurrency rankings**

    The app provides cryptocurrency rankings based on their market positions. Users can see which cryptocurrencies have the highest market capitalization and are most significant in the world of cryptocurrencies.

5.  **Cryptocurrency news**

    The app gathers the latest news and information from the world of cryptocurrencies. Users can browse various articles, market analyses, and updates related to their favorite cryptocurrencies. This allows them to stay up to date and make informed investment decisions.

## App Layout

The application is fully responsive. It was designed and programmed in accordance with the mobile first principle. Below are screenshots of the desktop version:

<img width="1512" alt="Screenshot 2023-05-26 at 21 06 02" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/b11ef245-a477-44e6-95f0-d47f09c12dab">
<img width="1512" alt="Screenshot 2023-05-26 at 21 26 57" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/93acd4dc-3924-4906-9d6c-3b22ddd50789">

<img width="1512" alt="Screenshot 2023-05-26 at 21 27 04" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/89901fea-ef20-4f8d-b022-236e44c5334f">
![Screenshot 2023-05-26 at 21 27 5](https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/d95089de-d3c9-4ce4-94aa-e3b1d52f9238)
<img width="1512" alt="Screenshot 2023-05-26 at 21 28 07" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/ae987202-50bc-4c22-a974-e32406baa5fb">

<img width="1512" alt="Screenshot 2023-05-26 at 21 27 21" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/6c9f328c-2504-4618-b465-8b526fd7e043">
<img width="1512" alt="Screenshot 2023-05-26 at 21 27 34" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/7788a7f2-68c0-435e-88e4-e171a12223ca">
<img width="1512" alt="Screenshot 2023-05-26 at 21 27 42" src="https://github.com/kacperbylicki/cryptocurrency-viewer/assets/81325472/990414fc-7694-4f1e-9c0b-8699ccafbe5e">

## Technologies

**Frontend:** React, TypeScript, Vite, SCSS, React Query, Context API

**Backend:** Nest.js, Typescript, MongoDB, Mongoose, JWT for authentication, GRPC for communication between microservices

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

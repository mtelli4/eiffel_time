# Eiffel Time

## Requierements

* PostgreSQL database and ingrid schema

## Installation

Run the following command at root of the project : `npm install`

## Run

### Web :

Run the following command at root of the project : `npm run start:web`

Copy the `.env.example` to `.env` and complete the `DATABASE_URL` by replacing :
1. `user` by database user;
2. `password` by password of the database user;
3. `server` by server name;
4. `port` by port of the database (default : 5432);
5. `dbname` by database name;
6. `schemaname` by schema name;
`
```
npx prisma
npx prisma db pull
```

For the server, open a second terminal and run : `npm run start:server`

### Mobile :

Open a terminal and run : `cd packages/mobile && npm run start`

For Android, open a second terminal and run : `cd packages/mobile && npm run android`

For iOS, open a second terminal and run : `cd packages/mobile && npm run ios`

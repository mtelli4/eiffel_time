# Eiffel Time

## Requierements

![Static Badge](https://img.shields.io/badge/postgresql-v17.4-0064a5) ![Static Badge](https://img.shields.io/badge/node-v23.3.0-2980b9) ![Static Badge](https://img.shields.io/badge/npm-v10.9.0-333333) ![Static Badge](https://img.shields.io/badge/android_sdk-v31-a4c639) ![Static Badge](https://img.shields.io/badge/java-21-744e3b)

## Installation

Run the following command at root of the project : `npm install` to install all the dependencies.

### Database

Copy the `.env.example` to `.env` and complete the `DATABASE_URL` by replacing :
1. `user` by database user;
2. `password` by password of the database user;
3. `server` by server name;
4. `port` by port of the database (default : 5432);
5. `dbname` by database name;
6. `schemaname` by schema name;

Final result should look like this : `DATABASE_URL=postgresql://user:password@server:port/dbname?schema=schemaname`

This environment variable will be used to connect the server to the database for the Prisma ORM.

Copy the file `packages/shared/src/utils/ip_address.example.ts` to `packages/shared/src/utils/ip_address.ts` and complete the `ip_address` by the ip address of the server (your computer). This file will be used to connect the mobile application to the server for your own android device.

Run the following command at root of the project, replace `utilisateur_de_la_bdd` by the database user and `bdd` by the database name :

```
USER=utilisateur_de_la_bdd DATABASE=bdd npm run db:pull:full
```

## Run

### Server :

For the server, open a second terminal and run : `npm run start:server`

### Web :

Run the following command at root of the project : `npm run start:web`

### Mobile :

Open a terminal and run : `cd packages/mobile && npm run start`

For Android, open a second terminal and run : `cd packages/mobile && npm run android`

For iOS, open a second terminal and run : `cd packages/mobile && npm run ios`


## Development

### Server :

Use this command to export your database schema to the Prisma schema : `USER=utilisateur_bdd DATABASE=bdd SCHEMA=ingrid npm run db:data`, replace `utilisateur_bdd` by the database user, `bdd` by the database name and `ingrid` by the schema name.

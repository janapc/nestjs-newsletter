<div align="center">
  <h1>Nestjs Newsletter</h1>
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/janapc/nestjs-newsletter"/>
  <img alt="Language top" src="https://img.shields.io/github/languages/top/janapc/nestjs-newsletter"/>
  <img alt="Repo size" src="https://img.shields.io/github/repo-size/janapc/nestjs-newsletter"/>

<a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#requirement">Requirement</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#run-project">Run Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#request-api">Request API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#technologies">Technologies</a>

</div>

## Project

This project is based on a newsletter.People subscribe to receive news about something topic and the author creates new content and is automatically is sent to list of subscribers.

## Requirement

To this project your need:

- Nodejs v18 [Nodejs](https://nodejs.org/en/)
- docker [Docker](https://www.docker.com/)

Inside _apps/subscribers_ create a new file **.env** and put your information about database connection:

```json
DATABASE_URL=""
```

Inside _apps/mails_ create a new file **.env** and put your information about database connection and mail service:

```json
MONGODB_URI=""
MAIL_FROM=""
MAIL_HOST=""
MAIL_PORT=0
MAIL_AUTH_USER=""
MAIL_AUTH_PASS=""
```

Inside _apps/contents_ create a new file **.env** and put your information about database connection:

```json
MONGODB_URI=""
```

## Run Project

Start Docker in your machine and run this commands in your terminal:

```sh
## up mongodb, kafka and mysql
❯ docker compose up -d

## run this command to create topics on kafka:
❯ script/init.sh

## run this command to create database subscriber:
❯ cd apps/subscribers && npx prisma migrate dev --name create-table-subscriber

## run this command to up api subscriber(:3000)
❯  npm run start:dev

## run this command to up api content(:3001)
❯  npm run start:dev contents

## run this command to up service mails(:3002)
❯  npm run start:dev mails
```

## Request API

[content-api](http://localhost:3001/api)
[subscriber-api](http://localhost:3000/api)

## Technologies

- nodejs
- nestjs
- mongodb
- mysql
- kafka
- nodemailer

<div align="center">

Made by Janapc 🤘 [Get in touch!](https://www.linkedin.com/in/janaina-pedrina/)

</div>

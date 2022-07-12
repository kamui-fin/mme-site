# mme-site

A work in progress e-commerce website developed with Next JS and Strapi for Monogatari Media Editorial, a publishing company specialized in translating and publishing books and other forms of written media.

## Local installation

Docker (with docker-compose) is used to deploy the entire infrastructure.

```sh
git clone https://github.com/kamui-fin/mme-site.git
cd mme-site
git switch dev
docker-compose up -d
```

First, open up [http://localhost:2337](http://localhost:2337) and sign up for a local Strapi account. After that, you should be able to load the main page, which is located at [http://localhost:4000](http://localhost:4000).

## Features

- JWT Authentication
- Payment processing with Stripe integration
- Add product details and blog articles into a user-friendly CMS
- Add to cart, wish list, and confirm order
- Page content (e.g. titles, about us text) dynamically loaded from CMS
- Individual product details pages with related books carousel
- Contact form, storing messages in the CMS with email alerts
- Catalog page

  - Filters based on genre, cover type, availability, and price range
  - Search as you type
  - Sort A-Z, Z-A, or by pricing

- More features planned

## Architecture

There are 4 main components:

- PostgreSQL
- Strapi CMS
- Express Backend
- Next JS Frontend

Main language: Typescript

PostgreSQL is used as a database for the express backend, which stores all user details, transaction information, wish lists, and other non company-facing data.
The CMS is used as an alternative data source for entities such as products, genres, and articles, since it is simpler for non-technical staff to add new entries through a GUI.

The Express backend contains all the business logic for the core e-commerce system, such as issuing JWT tokens for authorization and creating Stripe intents. The frontend is written in React and uses Next JS for server side rendering. It uses Sass for a CSS pre-processor and Redux for global state.

## License

This project is licensed under [GPLv3](https://choosealicense.com/licenses/gpl-3.0/)

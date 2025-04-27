# Topic
You need a graphql server to access an existing database? Here is a setup you might like.

## The idea & the why

We want to use **typescript**, as it gives is the option to **use the generated types in the frontend** later on.
As the existing database is our source of truth, we want to **get the schema of the database** first. (We could also go schema first if no db exists). We opt for [prisma](https://www.prisma.io/docs) as its very mature and flexible. **Prisma will generate typescript types and entities** for us. [Pothos](https://pothos-graphql.dev/docs/guide) with a [prisma plugin](https://www.npmjs.com/package/@pothos/plugin-prisma) will enable us to **leverage these already generated entities** and types to build our graphql

### Fastify
We need a server framework which runs our code. We go for [fastify](https://fastify.dev/docs/latest/) as it gives us full control over every aspect a webserver might care about, e.g. rate-limiting, auth or utilising a message bus like kafka.


### Yoga
As graphql server we go with [yoga](https://the-guild.dev/graphql/yoga-server/docs). Its setup a as a plugin. As yoga can be used without fastify it keeps us more loose coupled to the server framework.


### Pothos
The schema is built with [pothos](https://pothos-graphql.dev/docs/guide) and a [prisma plugin](https://www.npmjs.com/package/@pothos/plugin-prisma). We can still build queries and mutations without using the plugin, which maintains our flexibility.

### Generator (for microservices)
**npm run schema:generate** generates the graphql schema. We can use this file to use ci/cd to **check nothing breaks**. Lets say you have a **fontend which uses this schema** and builds its types and queries upon it. If our graphql server, and the expose schema changes - this might break. If we build this schema we can use ci/cd to check whether the **schema living in the frontend repo matches the schema of this service**. Making sure we release both servicees together.

## Sample

### Schema Code
We can use relations out of the box. The object builder could be done even more abstract / automatic - but lets keep it simple :)
```
builder.prismaObject("customer", {
  fields: (t) => ({
    id: t.exposeInt("customer_id"),
    firstName: t.exposeString("first_name"),
    email: t.exposeString("email"),
    lastName: t.exposeString("last_name"),
    employee: t.relation("employee"),
  }),
});

builder.queryFields((t) => ({
  customers: t.prismaField({
    type: ["customer"],
    args: {
      email: t.arg({
        type: "String",
        required: false,
      }),
    },
    resolve: (query, root, args, ctx, info) =>
      prisma.customer.findMany({
        ...query,
        where: {
          email: { contains: args.email ?? "" },
        },
      }),
  }),
}));
```

### Query

```
query customers($email: String) {
  customers(email:$email) {
    firstName
    email
    lastName
    employee {
      firstName
    }
  }
  
}

{
  "email": "luisr"
}
```

## Setup

Run database:

`docker compose -f ./docker/docker-compose.yml up`

Add sample data if you like.

Make sure to create a .env file

`npm run dev`

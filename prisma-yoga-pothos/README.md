`docker compose -f ./docker/docker-compose.yml up``
`npx prisma`

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
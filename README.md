# nodejs-crud-example
Simple CRUD REST API using NodeJS

### Technologies:
- mongodb
- nodejs
- docker (for local dev and test environments)

### Main packages:
- koa (web server)
- joi (validation)
- mongoose (mongodb ORM)
- jest (testing)


## V0 - Simple CRUD API

Easy setup for an easy CRUD API using mongoose models from the same file where the API routes are set up.
Integration tests by calling the API endpoints.

Check v0/simple-api branch.


## V1 - Layered Architecture

> Router
> - validates input (same file)
> - calls controller (same file)
>
> Service
> - business logic
> - calls DAL and works with DB Model
>
> Data Access Layer
> - DAO (Data Access Object, uses DB Model)
> - DB Model (connects to DB)
>

**PROS:**

* Separate responsibilities in different layers, decoupling the business logic from the controllers.

**CONS:**

* DAL still coupled to business logic given that mongoose objects are returned from DAO functions to service functions.
* Router and controller could be spit up since they are not the same thing.
* Validation coupled to router which makes it difficult to test it in isolation.

## V2 - Simplified Hexagonal Architecture

> Router
> - calls controller (same file)
>
> Service
> - validation logic
> - business logic
> - calls injected DAO and works with plain objects
>
> Data Access Layer
> - DAO (Data Access Object, uses DB Model and returns plain object to business logic layer)
> - DB Model (connects to DB)
>

**PROS:**

* Same architecture but decoupling layers even further
    * Validation decoupled from Router (runs in business loigc layer)
    * Validation logic can be tested in isolation
    * DB Model decoupled from business logic (DAO functions now return plain objects)
    * Added DI (dependency injection)
    * Business logic is completely decoupled now

**CONS:**

* 

## V3 - Hexagonal Architecture (no ports)

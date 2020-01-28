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

**CHANGES:**

* Separate responsibilities in different layers, decoupling the business logic from the controllers.

**TODO:**

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

**CHANGES:**

* Same architecture but decoupling layers even further
    * Validation decoupled from Router (runs in business logic layer)
    * Validation logic can be tested in isolation
    * DB Model decoupled from business logic (DAO functions now return plain objects)
    * Added DI (dependency injection)
    * Business logic is loosely decoupled now and components should be easily replaced

**TODO:**

* Hexagonal architecture could be clearer
* No test doubles yet
* Dependencies created in Controller

## V3 - Hexagonal Architecture (no ports)

> Actors 
> - primary/drivers (input)
>   - WebServer/Router
>   - Other (CLI, tests, queues (consumer), GUIs, etc)
> - secondary/driven (connection to infrastructure)
>   - Database (DAO, Model)
>   - Cache
>   - Other (3rd party APIs, queues (publish), emails, etc)
>
> Adapters
> - primary/drivers (input)
>   - Controller (connects Router to Business logic)
> - secondary/driven (connection to infrastructure)
>   - Repository (connects Business logic to data)
>
> Application/Business Logic
> - validation logic
> - business logic
> - DAL integration through repository

**CHANGES:**

* Repository pattern handles data sync between cache and db
* Business logic knows nothing about how or where the data is stored
* Easier to change implementations and test
* Clearer responsibilities in layers
* Dependencies injected from Router
* Added test doubles for unit tests (Stubs and Spies)

**TODO:**

* Possible improvements in case of increasing complexity
    * Async writes
    * Saga pattern
    * Command Query Responsibility Segregation (CQRS) 

NOTE: No ports due to Javascript nature means there is no actual contract and developers should be trusted to follow the concrete implementations

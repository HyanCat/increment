## Increment

An interface that provides a globally increase id.

### Usage

#### Node.js

**Requirement**

-   node.js
-   redis

1. Install node modules with `npm` or `yarn`.
2. Just run `app.js` with node.js.

    ```bash
    node app.js
    ```

#### Docker

1. Create a `docker-compose.yml` file. Here is a sample:

    ```yaml
    version: "3"

    services:
        app:
            image: hyancat/increment
            ports:
                - "3000:3000"
            links:
                - redis
            networks:
                - increment
            restart: always
        redis:
            image: redis:alpine
            volumes:
                - v_redis:/data
            networks:
                - increment
            restart: always
            command: redis-server --requirepass secret --protected-mode no

    networks:
        increment:
            driver: "bridge"

    volumes:
        v_redis:
            driver: "local"
    ```

2. Run `docker-compose` to start service containers.

    ```bash
    docker-compose up -d
    ```

### Finally

Visit the ip or domain with port (if needed), you will get it.

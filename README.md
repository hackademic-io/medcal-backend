# MedCal - backend

## How to run the backend services in Docker containers

### 1. Install docker [here](https://docs.docker.com/get-docker/)

### 2. Run docker daemon. The Docker app will open

### 3. In the CLI go to each services' folder and run

```
docker build -t service-name .
```

(Now you should be able to see the image in the Docker app)

### 4. Then, in each services' folder run

```
docker run -p INNER_PORT:OUTER_PORT service-name
```

the `INNER_PORT` is the one specified in the .env for that service.
the `OUTER_PORT` is the one that will be used to access what is inside of the container (usually the same as `INNER_PORT`)

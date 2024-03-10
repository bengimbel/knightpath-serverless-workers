# Knight Path

## Description

This is a serverless application I build with Cloudflare workers. This application has two services

1. api
2. consumer

The api handles the two requests required for this project, and pushes the coordinates to a queue. Once results are pushed to the queue, the consumer reads from the queue, calculates the shortest distance if possible, and then saves results to the database.

### API

`POST: https://api.bengimbel.workers.dev/knightPath?source=<source>&target=<target>`

EX: `POST` https://api.bengimbel.workers.dev/knightPath?source=h1&target=d4

1. This endpoint does validation on the request. If the query params are valid, the api endpoint handles the request by putting the coordinates in a queue.
2. Once the coordinates are pushed to the queue, we return the operation id and the knight path coordiantes are handled async via the queue.
   A sample success response is

```
{
    "operationId": "e401f34d-b61b-4ced-8c08-536283609126",
    "message": "Operation Id: e401f34d-b61b-4ced-8c08-536283609126 was added to the queue. Please query it to find your results."
}
```

`GET: https://api.bengimbel.workers.dev/knightPath?operationId=<operationId>`

EX: `GET` https://api.bengimbel.workers.dev/knightPath?operationId=37227372-f082-4dd9-b102-8a7012d18f3c

1. Once the queue handles the shortest distance, users can then make a `GET` request to the endpoint above to see the results of their `POST` request above. We query the database using the `operationId`.

A sample success response is

```
{
    "operationId": "6d35109d-58af-4024-9602-6d3c4ad65af4",
    "shortestPath": "H3:F4:D5:E7",
    "numberOfMoves": 3,
    "starting": "H3",
    "ending": "E7"
}
```

An impossible move is still a successful response

```
{
    "operationId": "e4935eb9-779a-4192-adcf-f4a7bf47aa4f",
    "shortestPath": "",
    "numberOfMoves": -1,
    "starting": "H3",
    "ending": "H4"
}
```

### Consumer Queue

1. Once the coordiantes and uuid are pushed to the queue, the consumer reads the message from the queue, and calculates the shortest distance using BFS. Once the shortest distance is calculated, we save the results in Cloudflares D1 database.

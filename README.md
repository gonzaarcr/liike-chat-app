## Commands

### Messages

```bash
curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/messages

curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/messages/9b7a7970-6734-11ef-bd5d-b5a507ef325c

curl -X POST https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/messages --data '{ "content": "content", "senderUserId": "User1", "threadId": "thread1", "groupId": "group1" }'

curl -X PUT https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/messages/9b7a7970-6734-11ef-bd5d-b5a507ef325c --data '{ "content": "content updated", "senderUserId": "User1", "threadId": "thread1", "groupId": "default" }'

curl -X DELETE https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/messages/9b7a7970-6734-11ef-bd5d-b5a507ef325c
```

### Users

```bash
curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/users

curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/users/e245f4d0-671e-11ef-828c-114bb969ae28

curl -X POST https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/users --data '{ "userName": "username", "dateOfBirth": "2024-01-01T00:00:00.000Z" }'

curl -X PUT https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/users/e245f4d0-671e-11ef-828c-114bb969ae28 --data '{ "userName": "new username", "dateOfBirth": "2024-01-01T00:00:00.000Z" }'

curl -X DELETE https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/users/e245f4d0-671e-11ef-828c-114bb969ae28
```

### Threads

```bash
curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups

curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups/e245f4d0-671e-11ef-828c-114bb969ae28

curl -X POST https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups --data '{ "color": "color", "threadName": "new Thread name" }'

curl -X PUT https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups/e245f4d0-671e-11ef-828c-114bb969ae28 --data '{ "color": "color", "threadName": "new Thread name", "groupId": "group1" }'

curl -X DELETE https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups/e245f4d0-671e-11ef-828c-114bb969ae28
```

### Groups

```bash
curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups

curl https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups/e245f4d0-671e-11ef-828c-114bb969ae28

curl -X POST https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups --data '{ "groupName": "groupName" }'

curl -X PUT https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups/e245f4d0-671e-11ef-828c-114bb969ae28 --data '{ "groupName": "groupName" }'

curl -X DELETE https://g26askhseg.execute-api.us-west-2.amazonaws.com/dev/api/groups/e245f4d0-671e-11ef-828c-114bb969ae28
```

# Deploying

Install

`npm i`

Compile and deploy

`tsc; npx serverless deploy`

(TODO: add `serverless-esbuild` for compiling on serverless step)

## Usage

Commands for CRUD:

### Create a Todo

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos --data '{ "text": "Learn Serverless" }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all Todos

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90feaa11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"206793aa11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/todos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

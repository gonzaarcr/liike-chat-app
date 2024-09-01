# Deploying

Install

`npm i`

Deploy

`npx serverless deploy`

Test

`npm test`

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

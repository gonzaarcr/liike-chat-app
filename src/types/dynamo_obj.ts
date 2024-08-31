import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Message } from "./message";

export interface DynamodbTable<T> {
  TABLE_NAME: string;
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  save(obj: T): Promise<void>;
  get(pk: string): Promise<T>;
  getLastN(n: number): Promise<T[]>;
  edit(pk: string, obj: T): Promise<T>;
  delete(pk: string): Promise<void>;
}

export class MessagesTable implements DynamodbTable<Message> {
  TABLE_NAME: string = process.env.MESSAGES_TABLE!!;
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async edit(pk: string, obj: Message): Promise<Message> {
    const command = new UpdateCommand({
      TableName: process.env.MESSAGES_TABLE,
      Key: {
        messageId: pk,
      },
      ExpressionAttributeNames: {
        '#content': 'content',
        '#senderUserId': 'senderUserId',
        '#groupId': 'groupId',
        '#threadId': 'threadId',
      },
      ExpressionAttributeValues: {
        ':content': obj.content,
        ':senderUserId': obj.senderUserId,
        ':groupId': obj.groupId,
        ':threadId': obj.threadId,
      },
      UpdateExpression: 'SET #content = :content, #senderUserId = :senderUserId, #groupId = :groupId, #threadId = :threadId',
      ReturnValues: 'ALL_NEW',
    });

    const response = await this.docClient.send(command);
    return response.Attributes as Message;
  }

  async delete(pk: string): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Key: {
        messageId: pk,
      }
    }
    const command = new DeleteCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async save(obj: Message): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Item: obj
    }
    const command = new PutCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async get(pk: string): Promise<Message> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        messageId: pk,
      },
    };
    const command = new GetCommand(params);
    const response = await this.docClient.send(command);
    return response.Item as Message;
  }

  async getLastN(/* TODO n: number */): Promise<Message[]> {
    const params = {
      TableName: this.TABLE_NAME,
    };
    const command = new ScanCommand(params);
    const response = await this.docClient.send(command);
    return response.Items as Message[];
  }

  async getByThread(threadId: string, n: number): Promise<Message[]> {
    const params = {
      TableName: this.TABLE_NAME,
      IndexName: 'thread-id-index',
      ExpressionAttributeValues: {
        ":threadId": threadId,
      },
      KeyConditionExpression: "threadId = :threadId",
      ScanIndexForward: false,
      Limit: n,
    };
    const command = new QueryCommand(params);
    const response = await this.docClient.send(command);
    return response.Items as Message[];
  }
}

export class UsersTable implements DynamodbTable<User> {
  TABLE_NAME: string = process.env.USERS_TABLE!!;
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async edit(pk: string, obj: User): Promise<User> {
    const command = new UpdateCommand({
      TableName: process.env.MESSAGES_TABLE,
      Key: {
        userId: pk,
      },
      ExpressionAttributeNames: {
        '#dateOfBirth': 'dateOfBirth',
        '#userName': 'userName',
      },
      ExpressionAttributeValues: {
        ':dateOfBirth': obj.dateOfBirth,
        ':userName': obj.userName,
      },
      UpdateExpression: 'SET #createdAt = :createdAt, #dateOfBirth = :dateOfBirth, #userName = :userName',
      ReturnValues: 'ALL_NEW',
    });

    const response = await this.docClient.send(command);
    return response.Attributes as User;
  }

  async delete(pk: string): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Key: {
        userId: pk,
      }
    }
    const command = new DeleteCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async save(obj: User): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Item: obj
    }
    const command = new PutCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async get(pk: string): Promise<User> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        userId: pk,
      },
    };
    const command = new GetCommand(params);
    const response = await this.docClient.send(command);
    return response.Item as User;
  }

  async getLastN(/* TODO n: number */): Promise<User[]> {
    const params = {
      TableName: this.TABLE_NAME,
    };
    const command = new ScanCommand(params);
    const response = await this.docClient.send(command);
    return response.Items as User[];
  }
}

export class ThreadsTable implements DynamodbTable<Thread> {
  TABLE_NAME: string = process.env.THREADS_TABLE!!;
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async edit(pk: string, obj: Thread): Promise<Thread> {
    const command = new UpdateCommand({
      TableName: process.env.MESSAGES_TABLE,
      Key: {
        messageId: pk,
      },
      ExpressionAttributeNames: {
        '#color': 'color',
        '#threadName': 'threadName',
      },
      ExpressionAttributeValues: {
        ':color': obj.color,
        ':threadName': obj.threadName,
      },
      UpdateExpression: 'SET #color = :color, #threadName = :threadName',
      ReturnValues: 'ALL_NEW',
    });

    const response = await this.docClient.send(command);
    return response.Attributes as Thread;
  }

  async delete(pk: string): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Key: {
        threadId: pk,
      }
    }
    const command = new DeleteCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async save(obj: Thread): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Item: obj
    }
    const command = new PutCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async get(pk: string): Promise<Thread> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        threadId: pk,
      },
    };
    const command = new GetCommand(params);
    const response = await this.docClient.send(command);
    return response.Item as Thread;
  }

  async getLastN(/* TODO n: number */): Promise<Thread[]> {
    const params = {
      TableName: this.TABLE_NAME,
    };
    const command = new ScanCommand(params);
    const response = await this.docClient.send(command);
    return response.Items as Thread[];
  }

  async getByGroup(groupId: string, n: number): Promise<Thread[]> {
    const params = {
      TableName: this.TABLE_NAME,
      IndexName: 'group-id-index',
      ExpressionAttributeValues: {
        ":groupId": groupId,
      },
      KeyConditionExpression: "groupId = :groupId",
      ScanIndexForward: false,
      Limit: n,
    };
    const command = new QueryCommand(params);
    const response = await this.docClient.send(command);
    return response.Items as Thread[];
  }
}

export class GroupsTable implements DynamodbTable<Group> {
  TABLE_NAME: string = process.env.GROUPS_TABLE!!;
  client: DynamoDBClient;
  docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({});
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async edit(pk: string, obj: Group): Promise<Group> {
    const command = new UpdateCommand({
      TableName: process.env.MESSAGES_TABLE,
      Key: {
        groupId: pk,
      },
      ExpressionAttributeNames: {
        '#groupName': 'groupName',
        '#lastMessageAt': 'lastMessageAt',
      },
      ExpressionAttributeValues: {
        ':groupName': obj.groupName,
        ':lastMessageAt': obj.lastMessageAt,
      },
      UpdateExpression: 'SET #groupName = :groupName, #lastMessageAt = :lastMessageAt',
      ReturnValues: 'ALL_NEW',
    });

    const response = await this.docClient.send(command);
    return response.Attributes as Group;
  }

  async delete(pk: string): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Key: {
        groupId: pk,
      }
    }
    const command = new DeleteCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async save(obj: Group): Promise<void> {
    const queryParams = {
      TableName: this.TABLE_NAME,
      Item: obj
    }
    const command = new PutCommand(queryParams);
    const response = await this.docClient.send(command);
  }

  async get(pk: string): Promise<Group> {
    const params = {
      TableName: this.TABLE_NAME,
      Key: {
        groupId: pk,
      },
    };
    const command = new GetCommand(params);
    const response = await this.docClient.send(command);
    return response.Item as Group;
  }

  async getLastN(/* TODO n: number */): Promise<Group[]> {
    const params = {
      TableName: this.TABLE_NAME,
    };
    const command = new ScanCommand(params);
    const response = await this.docClient.send(command);
    return response.Items as Group[];
  }
}
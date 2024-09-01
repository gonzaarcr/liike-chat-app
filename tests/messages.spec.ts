import { mockClient } from "aws-sdk-client-mock";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Message } from "../src/types/message";
import { handler as createHandler } from "../src/messages/create"
import { handler as editHandler } from "../src/messages/update"
import { handler as deleteHandler } from "../src/messages/delete"
import { handler as getHandler } from "../src/messages/get"

process.env.GROUPS_TABLE = 'chat-app-dev-users'
process.env.THREADS_TABLE = 'chat-app-dev-threads'
process.env.MESSAGES_TABLE = 'chat-app-dev-messages'
process.env.GROUPS_TABLE = 'chat-app-dev-groups'

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("Dynamo DB", () => {
  beforeEach(() => {
    ddbMock.reset();
  });

  it("should get user message from DynamoDB", async () => {
    const mockMsg: Message = {
      groupId: "g",
      messageId: "id1",
      content: "a",
      createdAt: "2022-01-31T09:23:16.662Z",
      senderUserId: "a",
      threadId: "t"
    }
    ddbMock.on(GetCommand).resolves({
      Item: mockMsg,
    });
    //@ts-ignore
    const r = await getHandler({ pathParameters: { id: mockMsg.messageId } });
    expect(r.statusCode).toStrictEqual(200);
    const body = JSON.parse(r.body) as Message;
    expect(body.senderUserId).toStrictEqual(mockMsg.senderUserId);
    expect(body.content).toStrictEqual(mockMsg.content);
    expect(body.threadId).toStrictEqual(mockMsg.threadId);
    expect(body.groupId).toStrictEqual(mockMsg.groupId);
  });

  it("should save message to DynamoDB", async () => {
    const testInput: Partial<Message> = {
      groupId: "g",
      content: "a",
      senderUserId: "a",
      threadId: "t"
    }
    //@ts-ignore
    const r = await createHandler({ body: JSON.stringify(testInput) });
    expect(r.statusCode).toStrictEqual(200);
    const body = JSON.parse(r.body) as Message;
    expect(body.senderUserId).toStrictEqual(testInput.senderUserId);
    expect(body.content).toStrictEqual(testInput.content);
    expect(body.threadId).toStrictEqual(testInput.threadId);
    expect(body.groupId).toStrictEqual(testInput.groupId);
  });

  it("should edit message", async () => {
    const mockMsg: Message = {
      groupId: "g",
      messageId: "id1",
      content: "a",
      createdAt: "2022-01-31T09:23:16.662Z",
      senderUserId: "a",
      threadId: "t"
    }
    const newMsg: Message = { ...mockMsg, content: "New Content" }
    ddbMock.on(UpdateCommand).resolves({
      Attributes: newMsg,
    });

    //@ts-ignore
    const r = await editHandler({ body: JSON.stringify(newMsg), pathParameters: { id: mockMsg.messageId } });
    expect(r.statusCode).toStrictEqual(200);
    const body = JSON.parse(r.body) as Message;
    expect(body.content).toStrictEqual("New Content");
  });

  it("should delete message", async () => {
    const mockMsg: Message = {
      groupId: "g",
      messageId: "id1",
      content: "a",
      createdAt: "2022-01-31T09:23:16.662Z",
      senderUserId: "a",
      threadId: "t"
    }
    ddbMock.on(DeleteCommand, { 
      Key: {
        messageId: "id1",
      }
    }).resolves({})

    //@ts-ignore
    const r = await deleteHandler({ pathParameters: { id: mockMsg.messageId } });
    expect(r.statusCode).toStrictEqual(200);
  });
})

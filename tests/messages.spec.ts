import { mockClient } from "aws-sdk-client-mock";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { MessagesTable } from "../src/types/dynamo_obj";
import { Message } from "../src/types/message";

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
    const msg = await new MessagesTable().get("id1");
    expect(msg.groupId).toStrictEqual("g");
  });
})

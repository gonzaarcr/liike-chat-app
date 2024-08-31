import { GroupsTable } from "../types/dynamo_obj";

export const handler = async () => {
  const messages = await new GroupsTable().getLastN();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  };
};
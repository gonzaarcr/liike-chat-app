import { UsersTable } from "../types/dynamo_obj.js";

export const handler = async () => {
  const messages = await new UsersTable().getLastN();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  };
};
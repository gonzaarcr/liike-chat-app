import { ThreadsTable } from "../types/dynamo_obj";

export const handler = async () => {
  const messages = await new ThreadsTable().getLastN();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  };
};
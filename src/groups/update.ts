import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GroupsTable } from "../types/dynamo_obj";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters?.id || !event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid query parameter: 'id' is missing" }),
    };
  }

  const data = JSON.parse(event.body);
  const response = await new GroupsTable().edit(event.pathParameters.id, data)

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  };
};
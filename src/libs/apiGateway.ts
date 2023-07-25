import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const corsHeaderConfig = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': true,
}

export const formatJSONSuccessResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: corsHeaderConfig,
    body: JSON.stringify(response)
  }
}

export const formatJSONErrorResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 500,
    headers: corsHeaderConfig,
    body: JSON.stringify(response)
  }
}
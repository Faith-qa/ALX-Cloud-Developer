import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {updateToDo} from "../../helpers/ToDo";
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { cors } from 'middy/middlewares';
import * as middy from 'middy';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest';

const logger = createLogger('update todo item')
export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

        try{
            logger.info("Processing event: " + event)

            // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
            const todoId = event.pathParameters.todoId
            const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
            const userId = getUserId(event)

            await updateToDo(updatedTodo, todoId,userId)
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: ''
            }
        } catch (e) {
            logger.error("Error: " + e.message)
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: e.message
            }
        }
    }
)

handler.use(
    cors ({
        credentials: true
    })
)

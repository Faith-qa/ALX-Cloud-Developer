import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';
import {createToDo} from "../../helpers/ToDo";
import { createLogger } from '../../utils/logger';
import * as middy from 'middy';
import { getUserId } from '../utils';
import { cors } from 'middy/middlewares';


const logger = createLogger('create Todo item')

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try{
            logger.info('processing an event:', event)

            const newTodo: CreateTodoRequest = JSON.parse(event.body)
            const userId = getUserId(event)

            const neItem = await createToDo(newTodo, userId)
            return{
                statusCode: 201,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    neItem
                })
            }

        } catch (err) {
            logger.error('Error:' + err.message)
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },  
                body: err.message
        }
    }
}
)
handler.use(
    cors({
        credentials: true
    })
)

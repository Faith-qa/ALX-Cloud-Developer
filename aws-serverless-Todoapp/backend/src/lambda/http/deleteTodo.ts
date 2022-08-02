import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import {deleteToDo} from "../../helpers/ToDo";
import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { cors } from 'middy/middlewares';
import * as middy from 'middy';

const logger = createLogger('delete ToDo Item')

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
            logger.info('processing delete event:' + event)

            const todoId = event.pathParameters.todoId

            const userId = getUserId(event)

            try {
                await deleteToDo(todoId, userId)
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Origin': '*',

                    },
                    body: ''
                }
            }catch (err) {
                logger.error('error:' + err.message)
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
    cors ({
        credentials: true
    })
)
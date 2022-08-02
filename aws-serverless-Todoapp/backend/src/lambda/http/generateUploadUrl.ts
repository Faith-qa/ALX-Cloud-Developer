import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, } from 'aws-lambda'
import {generateUploadUrl} from "../../helpers/ToDo";
import { createLogger } from '../../utils/logger';
import { cors } from 'middy/middlewares';
import * as middy from 'middy';

const logger = createLogger('generate uploads URL')

export const handler = middy
(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        try{
            logger.info('processing urls event')
            const todoId = event.pathParameters.todoId

            const signedUploadUrl = await generateUploadUrl(todoId)

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    uploadUrl: signedUploadUrl
                })
            }
        } catch (err){
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
import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deleteToDo} from "../../businessLogic/ToDo";
import { getrawToken } from '../util-gettoken';
import { createLogger } from '../../utils/logger';


const logger = createLogger('Delete Todo Item')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    logger.info('Processing event:', event);
    
    const todoId = event.pathParameters.todoId;

    const deleteData = await deleteToDo(todoId, getrawToken(event));

    return {
        statusCode: 200,
        headers: { 
            "Access-Control-Allow-Origin": "*",
        },
        body: deleteData,
    }
};

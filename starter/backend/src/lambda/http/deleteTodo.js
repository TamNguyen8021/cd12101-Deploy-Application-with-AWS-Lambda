import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { deleteTodoTask } from '../../businessLogic/todos.mjs'

const logger = createLogger('deleteTodo')

export async function handler(event) {
  try {
    logger.info('Start deleting todo task')

    const { todoId } = event.pathParameters
    const userId = getUserId(event)

    await deleteTodoTask(userId, todoId)

    logger.info(`Delete todo task successfully: ${todoId}`)

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: undefined
    }
  } catch (error) {
    logger.error(`Delete todo task failed due to: ${error.message}`)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        status: 'Failed',
        message: error.message
      })
    }
  }
}

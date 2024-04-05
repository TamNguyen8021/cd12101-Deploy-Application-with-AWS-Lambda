import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { updateTodoTask } from '../../businessLogic/todos.mjs'

const logger = createLogger('updateTodo')

export async function handler(event) {
  try {
    logger.info('Start updating todo task')

    const { todoId } = event.pathParameters
    const updateTask = JSON.parse(event.body)
    const userId = getUserId(event)

    await updateTodoTask(userId, todoId, updateTask)

    logger.info(`Update todo task successfully: ${todoId}`)

    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: undefined
    }
  } catch (error) {
    logger.error(`Update todo task failed due to: ${error.message}`)

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

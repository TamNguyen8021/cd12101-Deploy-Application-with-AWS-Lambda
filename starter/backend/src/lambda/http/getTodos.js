import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { getTodoTasks } from '../../businessLogic/todos.mjs'

const logger = createLogger('getTodos')

export async function handler(event) {
  try {
    logger.info('Start getting todo tasks')

    const userId = getUserId(event)
    const todoTasks = await getTodoTasks(userId)

    logger.info('Get todo tasks successfully')

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ items: todoTasks })
    }
  } catch (error) {
    logger.error(`Get todo tasks failed due to: ${error.message}`)

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

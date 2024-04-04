import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { createTodoTask } from '../../businessLogic/todos.mjs'

const logger = createLogger('createTodo')

export async function handler(event) {
  try {
    logger.info('Start creating todo task')

    const newTask = JSON.parse(event.body)
    const userId = getUserId(event)
    const newTodoTask = await createTodoTask(userId, newTask)

    logger.info(`Create todo task successfully: ${newTodoTask}`)

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        item: newTodoTask
      })
    }
  } catch (error) {
    logger.error(`Create todo task failed due to: ${error.message}`)

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

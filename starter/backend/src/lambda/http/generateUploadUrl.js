import { createLogger } from '../../utils/logger.mjs'
import { getUserId } from '../utils.mjs'
import { saveAttachmentUrl } from '../../businessLogic/todos.mjs'

const logger = createLogger('generateUploadUrl')

export async function handler(event) {
  try {
    logger.info('Start generating url for uploaded file')

    const todoId = event.pathParameters.todoId
    const userId = getUserId(event)
    const uploadUrl = await saveAttachmentUrl(userId, todoId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl
      })
    }
  } catch (error) {
    logger.error(
      `Generate url for uploaded file failed due to: ${error.message}`
    )

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

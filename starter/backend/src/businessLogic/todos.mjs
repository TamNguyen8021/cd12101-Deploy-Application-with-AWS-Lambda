import { v4 as uuidV4 } from 'uuid'

import { TodosAccess } from '../dataLayer/todosAccess.mjs'
import { AttachmentUtils } from '../fileStorage/attachmentUtils.mjs'

const todosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

export async function getTodoTasks(userId) {
  return await todosAccess.getTodoTasks(userId)
}

export async function createTodoTask(userId, newData) {
  const todoId = uuidV4()
  const createdAt = new Date().toISOString()
  const newTodoTask = {
    todoId,
    userId,
    createdAt,
    done: false,
    ...newData
  }

  return await todosAccess.createTodoTask(newTodoTask)
}

export async function updateTodoTask(userId, todoId, updatedData) {
  return await todosAccess.updateTodoTask(userId, todoId, updatedData)
}

export async function deleteTodoTask(userId, todoId) {
  return await todosAccess.deleteTodoTask(userId, todoId)
}

export async function saveAttachmentUrl(userId, todoId) {
  const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
  await todosAccess.saveAttachmentUrl(userId, todoId, attachmentUrl)

  return attachmentUtils.getUploadUrl(todoId)
}

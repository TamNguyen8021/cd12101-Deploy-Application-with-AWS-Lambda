import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'

const dynamoDBClient = new DynamoDBClient()

export class TodosAccess {
  constructor(
    todosTable = process.env.TODOS_TABLE,
    docClient = DynamoDBDocumentClient.from(dynamoDBClient)
  ) {
    this.todosTable = todosTable
    this.docClient = docClient
  }

  async getTodoTasks(userId) {
    const input = {
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }
    const command = new QueryCommand(input)
    const result = await this.docClient.send(command)

    return result.Items
  }

  async createTodoTask(newData) {
    const input = {
      TableName: this.todosTable,
      Item: newData
    }
    const command = new PutCommand(input)

    await this.docClient.send(command)

    return newData
  }

  async updateTodoTask(userId, todoId, updatedData) {
    const input = {
      TableName: this.todosTable,
      Key: { userId, todoId },
      ConditionExpression: 'attribute_exists(todoId)',
      UpdateExpression: 'set #n = :n, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: { '#n': 'name' },
      ExpressionAttributeValues: {
        ':n': updatedData.name,
        ':dueDate': updatedData.dueDate,
        ':done': updatedData.done
      }
    }
    const command = new UpdateCommand(input)

    await this.docClient.send(command)
  }

  async deleteTodoTask(userId, todoId) {
    const input = {
      TableName: this.todosTable,
      Key: { userId, todoId }
    }
    const command = new DeleteCommand(input)

    await this.docClient.send(command)
  }

  async saveAttachmentUrl(userId, todoId, attachmentUrl) {
    const input = {
      TableName: this.todosTable,
      Key: { userId, todoId },
      ConditionExpression: 'attribute_exists(todoId)',
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      }
    }
    const command = new UpdateCommand(input)

    await this.docClient.send(command)
  }
}

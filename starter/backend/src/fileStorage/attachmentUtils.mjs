import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Bucket = process.env.S3_BUCKET
const urlExpireTime = process.env.SIGNED_URL_EXPIRATION

export class AttachmentUtils {
  constructor(
    s3 = new S3Client({ signatureVersion: 'v4' }),
    bucketName = s3Bucket
  ) {
    this.s3 = s3
    this.bucketName = bucketName
  }

  getAttachmentUrl(todoId) {
    return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
  }

  async getUploadUrl(todoId) {
    const input = {
      Bucket: this.bucketName,
      Key: todoId
    }
    const command = new PutObjectCommand(input)
    const signedUrl = await getSignedUrl(this.s3, command, {
      expiresIn: parseInt(urlExpireTime)
    })

    return signedUrl
  }
}

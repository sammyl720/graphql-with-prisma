import 'cross-fetch/polyfill'
import '@babel/polyfill/noConflict'
import seedDatabase, {
  userOne,
  commentOne,
  commentTwo,
  postOne
} from './utils/seedDatabase'
import prisma from '../src/prisma'
import getClient from './utils/getClient'
import {
  deleteComment,
  subscribeToComments,
  subscribeToPost,
  updatePost
} from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)
test('should delete own comment', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: commentOne.comment.id
  }

  await client.mutate({
    mutation: deleteComment,
    variables
  })

  const exists = await prisma.exists.Comment({
    id: commentOne.comment.id
  })

  expect(exists).toBe(false)
})

test('Should not delete other users comment', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: commentTwo.comment.id
  }

  await expect(
    client.mutate({
      mutation: deleteComment,
      variables
    })
  ).rejects.toThrow()
})

test('Should subscribe to comments for a post', async done => {
  const variables = {
    postId: postOne.post.id
  }

  client
    .subscribe({
      query: subscribeToComments,
      variables
    })
    .subscribe({
      next: response => {
        // Assertions
        expect(response.data.comment.mutation).toBe('DELETED')
        done()
      }
    })

  // Change a comment
  await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } })
})

test('Should subscribe to post', async done => {
  client
    .subscribe({
      query: subscribeToPost
    })
    .subscribe({
      next: response => {
        expect(response.data.post.mutation).toBe('UPDATED')
        done()
      }
    })

  await prisma.mutation.updatePost({
    data: {
      title: 'updated post one',
      body: 'Updated'
    },
    where: {
      id: postOne.post.id
    }
  })
})

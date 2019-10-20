import 'cross-fetch/polyfill'
import prisma from '../src/prisma'
import getClient from './utils/getClient'
import {
  getMyPosts,
  getPosts,
  createPost,
  deletePost,
  updatePost
} from './utils/operations'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
const client = getClient()

beforeEach(seedDatabase)

test('Should expose published posts', async () => {
  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should fetc users posts', async () => {
  const client = getClient(userOne.jwt)

  const { data } = await client.query({ query: getMyPosts })

  expect(data.myPosts.length).toBe(2)
})

test('Should be able updata own post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postOne.post.id,
    data: {
      published: false
    }
  }
  const { data } = await client.mutate({
    mutation: updatePost,
    variables
  })
  const exists = await prisma.exists.Post({
    id: postOne.post.id,
    published: false
  })
  expect(exists).toBe(true)
  expect(data.updatePost.published).toBe(false)
})

test('Should create a new post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    data: { title: 'this is a new post', body: '...', published: true }
  }

  const { data } = await client.mutate({
    mutation: createPost,
    variables
  })
  const exists = await prisma.exists.Post({
    id: data.createPost.id
  })
  expect(data.createPost.title).toBe('this is a new post')
  expect(data.createPost.body).toBe('...')
  expect(data.createPost.published).toBe(true)
  expect(exists).toBe(true)
})

test('Should be able to delete a post', async () => {
  const client = getClient(userOne.jwt)
  const variables = {
    id: postTwo.post.id
  }
  await client.mutate({
    mutation: deletePost,
    variables
  })

  const exists = await prisma.exists.Post({
    id: postTwo.post.id
  })

  expect(exists).toBe(false)
})

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'
const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@example.com',
    password: bcrypt.hashSync('Red@98!@#$')
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: 'Title number 1',
    body: 'number 1',
    published: true
  },
  post: undefined
}

const postTwo = {
  input: {
    title: 'Title number 2',
    body: 'number 2',
    published: false
  },
  post: undefined
}
const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  // create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)
  // create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
  // create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })
}
export { seedDatabase as default, userOne, postOne, postTwo }

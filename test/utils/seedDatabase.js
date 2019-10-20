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
const userTwo = {
  input: {
    name: 'Mike',
    email: 'mike@example.com',
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

const commentOne = {
  input: {
    text: 'This is a first comment'
  },
  comment: undefined
}

const commentTwo = {
  input: {
    text: 'This is a second comment'
  },
  comment: undefined
}
const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyComments()
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  // create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)
  // create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  })
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)
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

  // create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  // create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userTwo.user.id
        }
      }
    }
  })
}
export {
  seedDatabase as default,
  userOne,
  userTwo,
  postOne,
  postTwo,
  commentOne,
  commentTwo
}

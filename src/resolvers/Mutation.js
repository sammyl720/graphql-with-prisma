import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'
const Mutation = {
  createUser: async (parent, args, { prisma }, info) => {
    if (args.data.password.length < 8) {
      throw new Error('Password must be 8 Characters or longer')
    }

    // const emailTaken = await prisma.exists.User({ email: args.data.email })
    // if (emailTaken) {
    //   throw new Error('E-mail taken')
    // }
    const password = await bcrypt.hash(args.data.password, 10)
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    })
    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret')
    }
  },
  loginUser: async (
    parent,
    { data: { email, password } },
    { prisma },
    info
  ) => {
    const user = await prisma.query.user({ where: { email: email } })
    if (!user) throw new Error('User not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')

    return { user, token: jwt.sign({ userId: user.id }, 'thisisasecret') }
  },
  deleteUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    return prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
  updateUser: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data: args.data
      },
      info
    )
  },
  updatePost: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    })
    if (!postExists) {
      throw new Error('Unable to update post')
    }
    return prisma.mutation.updatePost(
      {
        data: args.data,
        where: {
          id: args.id
        }
      },
      info
    )
  },
  deletePost: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    })
    if (!postExists) {
      throw new Error('Unable to delete post')
    }
    return prisma.mutation.deletePost({ where: { id: args.id } }, info)
  },
  updateComment: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })
    if (!commentExists) {
      throw Error('Unable to Update comment')
    }
    return prisma.mutation.updateComment(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    )
  },
  deleteComment: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId
      }
    })
    // TODO give admin access
    if (!commentExists) {
      throw new Error('Could not delete comment')
    }
    return prisma.mutation.deleteComment(
      {
        where: { id: args.id }
      },
      info
    )
  },
  createPost: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    )
  },
  createComment: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request)
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: userId
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      },
      info
    )
  }
}

export default Mutation

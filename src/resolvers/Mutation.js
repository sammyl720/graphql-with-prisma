import v4 from 'uuid'

// Enum
// 1. A special type that defines a set of constants
// 2. This type can then be used for a field
// 3. values for the field must be one of the constants for the type
// UserRole - standard, editor, admin
// type User {
// role: UserRole!
// }

const Mutation = {
  createUser: async (parent, args, { prisma }, info) => {
    const emailTaken = await prisma.exists.User({ email: args.data.email })
    if (emailTaken) {
      throw new Error('E-mail taken')
    }
    return prisma.mutation.createUser({ data: args.data }, info)
  },
  deleteUser: async (parent, args, { prisma }, info) => {
    const userExists = await prisma.exists.User({ id: args.id })
    if (!userExists) throw new Error('User not found')
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info)
  },
  deletePost: async (parent, args, { prisma }, info) => {
    return prisma.mutation.deletePost({ where: { id: args.id } }, info)
  },
  updateUser: async (parent, args, { prisma }, info) => {
    return prisma.mutation.updateUser(
      {
        where: {
          id: args.id
        },
        data: args.data
      },
      info
    )
  },
  updatePost: async (parent, args, { prisma }, info) => {
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
  updateComment: (parent, args, { prisma }, info) => {
    return prisma.mutation.updateComment(
      {
        where: { id: args.id },
        data: args.data
      },
      info
    )
  },
  deleteComment: (parent, args, { prisma }, info) => {
    return prisma.mutation.deleteComment(
      {
        where: { id: args.id }
      },
      info
    )
  },
  createPost: async (parent, args, { prisma }, info) => {
    return prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author
            }
          }
        }
      },
      info
    )
  },
  createComment: async (parent, args, { prisma }, info) => {
    return prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
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

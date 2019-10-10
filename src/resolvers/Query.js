const Query = {
  users: (parent, args, { prisma }, info) => {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query
          },
          {
            email_contains: args.query
          }
        ]
      }
    }
    return prisma.query.users(opArgs, info)
  },
  posts: (parent, args, { prisma }, info) => {
    const opArgs = {}
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ]
      }
    }
    return prisma.query.posts(opArgs, info)
    // if (!args.query) {
    //   return db.posts
    // }
    // return db.posts.filter(post => {
    //   return (
    //     post.title.toLowerCase().includes(args.query.toLowerCase()) ||
    //     post.body.toLowerCase().includes(args.query.toLowerCase())
    //   )
    // })
  },
  me: () => {
    return {
      id: 'edon23',
      name: 'Shmuel Leider',
      email: 'sam.leider@gmail.com',
      age: 32
    }
  },
  post: () => {
    return {
      id: '092',
      title: 'Graphql 101',
      body: '',
      published: false
    }
  },
  comments: (parent, args, { prisma }, info) => {
    return prisma.query.comments(null, info)
  }
}

export default Query

import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.101:4466'
})

export default prisma
// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// prisma.exists
//   .Comment({
//     id: 'ck1hbbr8u004s0769drqey66z',
//     author: {
//       id: 'ck1haklbp002u076935xjw0ga'
//     }
//   })
//   .then(exists => {
//     console.log(exists)
//   })

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({ id: authorId })

//   if (!userExists) {
//     throw new Error('User not found')
//   }
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     },
//     `{ author { id name email posts { id title published } } }`
//   )
//   return post.author
// }

// createPostForUser('ck1hbcmy8004x07691xroy6nq', {
//   title: 'Great books to read',
//   body: 'The power of now',
//   published: true
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch(err => console.log(err.message))

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({
//     id: postId
//   })
//   if (!postExists) {
//     throw new Error('post not found')
//   }
//   const post = await prisma.mutation.updatePost(
//     {
//       data: {
//         ...data
//       },
//       where: {
//         id: postId
//       }
//     },
//     `{ author { id name email posts { id title published } } }`
//   )
//   return post.author
// }

// updatePostForUser('ck1haxt68003r0769c97le57o', {
//   title: 'Another post',
//   body: 'Let Code more...',
//   published: true
// })
//   .then(user => console.log(user))
//   .catch(err => console.log(err.message))

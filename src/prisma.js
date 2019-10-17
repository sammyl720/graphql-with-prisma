import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.101:4466',
  secret: 'what32ever12valuewelike',
  fragmentReplacements
})

export default prisma

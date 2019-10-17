import jwt from 'jsonwebtoken'
const jwtGenerate = id => {
  return jwt.sign({ userId: id }, 'thisisasecret', {
    expiresIn: '7 days'
  })
}

export default jwtGenerate

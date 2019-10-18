import jwt from 'jsonwebtoken'

const jwtGenerate = id => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: '7 days'
  })
}

export default jwtGenerate

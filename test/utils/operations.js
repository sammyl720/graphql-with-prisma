import { gql } from 'apollo-boost'

// user operations
const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`
const login = gql`
  mutation($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
    }
  }
`
const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`
// post operations

const getPosts = gql`
  query {
    posts {
      title
      body
      published
      id
    }
  }
`
const getMyPosts = gql`
  query {
    myPosts {
      title
      body
      published
      id
    }
  }
`
const updatePost = gql`
  mutation($id: ID!, $data: UpdatePostInput) {
    updatePost(id: $id, data: $data) {
      id
      title
      body
      published
    }
  }
`

const createPost = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      title
      body
      published
    }
  }
`
const deletePost = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      id
      title
      body
      published
    }
  }
`
export {
  getProfile,
  getUsers,
  login,
  createUser,
  getMyPosts,
  getPosts,
  createPost,
  deletePost,
  updatePost
}

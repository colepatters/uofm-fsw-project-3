import { gql } from "@apollo/client"

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      email
      firstName
      lastName
      photoUrl
      pet {
        id
        petName
        size
        age
        breed
        gender
        gotchaDate
        altered
        energyLevel
        }
    }
  }
`;

export const QUERY_PET = gql`
  query pet($petName: String!) {
    pet(petName: $petName){
        id
        petName
        size
        age
        breed
        gender
        gotchaDate
        altered
        energyLevel
        user {
            id
            firstName
            lastName
            email
            photoUrl
        }
    }
}`;

export const QUERY_ME = gql`
query me {
  me {
    id
    email
    password
    firstName
    lastName
    created
    modified
    pets {
      id
      petName
    }
  }
}`

export const QUERY_POSTS = gql`
query Posts {
  posts {
    id
    author {
      id
      firstName
      photoUrl
    }
    content
    photoUrl
    comments {
      id
      author {
        firstName
        id
      }
      content
      created
    }
    created
    modified
    postingAs {
      petName
      id
      photoUrl
    }
  }
}
`
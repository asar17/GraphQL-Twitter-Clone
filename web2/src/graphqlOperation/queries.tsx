import {gql} from '@apollo/client'
//to get all users
export const USERS_QUERY=gql`
query USERS_QUERY {
    users {
      id
      name
    }
  }
`

//isAuthenticated query
export const IS_LOGGED_IN=gql`
query IS_LOGGED_IN{
   me{
     id
    }
}
`
// //to get specific user=>[profile data]
export const ME_QUERY=gql`
query ME_QUERY{
    me{
      id
      name
      likedTweet{
        id
        tweet{
          id
        }
      }
      Profile {
        id
        bio
        location
        website
        avatar
      }
    }
}
`
//get all tweets
export const ALL_TWEETS=gql`
query  TWEETS{
  tweets{
    id
    createdAt
    content
    likes{
      id
    }
    comments{
      id
    }
    author{
      id
      name
      Profile{
        id
        avatar
      }
    }
  }
}
`
//get specific tweet
export const TWEET_QUERY=gql`
query TWEET_QUERY($id:Int){
  tweet(id:$id){
    id
    content
    author{
      id
      name
      Profile{
        id
        avatar
      }
    }
    comments{
      id
      content
      createdAt
      User{
        id
        name
        Profile{
          id 
          avatar
        }
      }
    }
  }
}
`



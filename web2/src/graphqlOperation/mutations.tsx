import {gql} from '@apollo/client'

//add new user to database
export const SIGNUP_MUTATION=gql`
mutation signup($name:String!,$email:String!,$password:String!){
    signup(name:$name,email:$email,password:$password){
        token
    }
}
`

//login user
export const LOGIN_MUTATION=gql`
mutation login($email:String!,$password:String!){
    login(email:$email,password:$password){
        token
    }
}
`
//create profile data
export const CREATE_PROFILE_MUTATION=gql`
mutation createProfie($bio:String!,$location:String!,$website:String,$avatar:String!){
    createProfile(bio:$bio,location:$location,website:$website,avatar:$avatar){
        id
    }
}
`
//update profile data
export const UDDATE_PROFILE_MUTATION=gql`
mutation updateProfie($id:Int!,$bio:String!,$location:String!,$website:String,$avatar:String!){
    updateProfile(id:$id,bio:$bio,location:$location,website:$website,avatar:$avatar){
        id
    }
}
`
//create tweet
export const CREATE_TWEET_MUTATION=gql`
mutation createTweet($content:String!){
    createTweet(content:$content){
      id
    }
}
`
//likes on tweet
export const LIKE_TWEET_MUTATION =gql`
mutation likeTweet($id:Int){
    likeTweet(id:$id){
       id
    }
}
`
//delete likes on tweet
export const DELETE_LIKE_TWEET_MUTATION=gql`
mutation deleteLike($id:Int!){
    deleteLike(id:$id){
        id
    }
}
`
//create comment on tweet
export const CREATE_COMMENT_MUTATION=gql`
mutation createComment($id:Int!,$content:String!){
    createComment(id:$id,content:$content){
        id
    }
}
`
import React from 'react'
import {ALL_TWEETS} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import { format } from "date-fns"
import '../styles/popularTweets.css'
//types of tweet
interface PopularTweetsType{
    id:number
    createdAt:Date
    content:string
    likes:{
        id:number
        length:number
    }
    author:{
        id:number
        name:string
        Profile:{
            avatar:string
        }
    }
}
const PopularTweets =()=>{
    const {loading,error,data}=useQuery(ALL_TWEETS)
    if(loading) return <p>Loading....</p>
    if(error) return <p>{error.message}</p>
    const getPopularTweets=data?.tweets.map((tweet:PopularTweetsType)=>tweet).sort(function(a:PopularTweetsType,b:PopularTweetsType){
        return b.likes.length-a.likes.length
    }).slice(0,6)
    return(
        <div className="popular-tweet">
          <h3 className="trending">Trending</h3>
          {getPopularTweets.map((tweet:PopularTweetsType)=>{
            return(
                <div className="popular-tweet-container">
                    {/*first child*/}
                    <div className="date-title">
                        <div className="title-logo">
                            <img
                              src={tweet.author.Profile.avatar}
                              style={{ width: "40px", borderRadius: "50%" }}
                              alt="logo" 
                            />
                            <p className="tweet-content">{tweet.content}</p>
                        </div>
                        <p className="date">{format(new Date(tweet.createdAt), "MM/dd/yy")}</p>
                    </div>
                    {/*second child*/}
                    <div className='tweet-likes'>
                       {tweet.likes.length>0? (<span>Likes {tweet.likes.length}</span>):null}
                    </div>
                </div>
            )
          })}
            
        </div>
    )
}
export default PopularTweets 
import React from 'react'
import {LikeTweet,DeleteLikeTweet,CreateComment} from './index'
import { formatDistance } from "date-fns"
import { subDays } from "date-fns/esm"
import {ALL_TWEETS,ME_QUERY} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import {Link} from 'react-router-dom'
import '../styles/alltweet.css'

//types tweet
interface TweetsType{
    id:number
    createdAt:Date
    content:string
    likes:[]
    comments:[]
    author:{
        id:number
        name:string
        Profile:{
            avatar:string
        }
    }
}
//types likedTweet
interface LikedTweets {
    id: number
    tweet: {
        id: number
    }
}
const AllTweets =()=>{
    const {loading,error,data}=useQuery(ALL_TWEETS)
    const {loading:me_loading,error:me_error,data:me_data}=useQuery(ME_QUERY)
    if(loading) return <p>Loading...</p>
    if(error) return <p>{error.message}</p>

    if(me_loading) return <p>Loading...</p>
    if(me_error) return <p>{me_error.message}</p>
    if(me_data){
        console.log('like',me_data)
    }
    return(
        <div>
            {data.tweets.map((tweet:TweetsType)=>{
                return(
                    <div className="tweet-container">
                        <Link to={`/tweet/${tweet.id}`}>
                            {/* first child */}
                            <div className="tweet-header">
                                <img
                                src={tweet.author.Profile.avatar}
                                style={{width:'40px',height:'40px',borderRadius:'50%'}}
                                alt="avatar"
                                />
                                <h4 className="name">{tweet.author.name}</h4>
                                <p className="date-time">
                                {formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago
                                </p>
                            </div>
                            {/* second child */}
                            <p>{tweet.content}</p>
                        </Link>
                        <div className="likes">
                           {/*check if the current tweet exits in user's tweet likes */}
                           {
                            me_data.me.likedTweet.map((t:LikedTweets)=>t.tweet.id).includes(tweet.id)?
                                (
                                    <span>
                                        {/* <span style={{marginRight:'3px'}}>
                                            <i className="fas fa-thumbs-up"></i>
                                        </span> */}
                                        <DeleteLikeTweet id={me_data.me.likedTweet.filter((like:LikedTweets)=>like.tweet.id===tweet.id)[0].id}/>
                                        {tweet?.likes.length}
                                    </span>
                                )
                                :
                                (<span>
                                    <LikeTweet id={tweet.id} />
                                    {tweet.likes.length}
                                </span>)
                            } 
                            {/*reply to tweet*/}
                            <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                                <CreateComment
                                   avatar={tweet.author.Profile.avatar}
                                   name={tweet.author.name}
                                   tweet={tweet.content}
                                   id={tweet.id}
                                />
                                {tweet?.comments?.length > 0 ? tweet.comments.length :null}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default AllTweets;
import React from 'react'
import {TWEET_QUERY} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import {useParams} from 'react-router-dom'
import {LeftNav,PopularTweets} from'../components'
import '../styles/primary.css'
import '../styles/home.css'

//types comment
interface CommentType{
    id:number
    content:string
    createdAt:Date
    User:{
        id:number
        name:string
        Profile:{
            id:number
            avatar:string
        }
    }
}
const SingleTweet =()=>{
    const {id}=useParams()
    console.log('params',id)
    const {loading,error,data}=useQuery(TWEET_QUERY,{variables:{id:parseInt(id)}})
    if(loading) return <p>Loading....</p>
    if(error) return <p>{error.message}</p>
    return(
        <>
            <div className="primary">
                {/* left div */}
                <div className="left">
                    <LeftNav/>
                </div>
                <div className="home">
                    <div className="home-header">
                        <h3 className="home-title">Tweet</h3>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 8fr", marginTop: "10px" }} >
                        <img
                        src={data.tweet.author.Profile.avatar}
                        style={{ width: "40px", borderRadius: "50%" }}
                        alt="avatar"
                        />
                    </div>
                    <p
                    style={{
                        borderLeft: "1px solid var(--accent)",
                        marginLeft:'20px',
                        paddingLeft:'20px',
                        marginTop:'0',
                        height:'50px',
                    }}
                    >
                        {data.tweet.content}
                    </p>
                    {data.tweet.comments.map((comment:CommentType)=>{
                        return(
                            <>
                                <div
                                 style={{
                                    display: "grid",
                                   gridTemplateColumns: "1fr 3fr 8fr", 
                                   marginTop:'10px',
                                   marginLeft:'10px'
                                  }}
                                >
                                    <img
                                     src={comment.User.Profile.avatar}
                                     style={{ width: "40px", borderRadius: "50%" }} 
                                     alt="avatar"
                                    />
                                    <h5>{comment.User.name}</h5>
                                    
                                </div>
                                <p>{comment.content}</p>
                            </>
                        )
                    })}
                       
                </div>
                {/* right div */}
                <div className="right">
                    <PopularTweets/> 
                </div>
            </div>
        </>
    )
}
export default SingleTweet
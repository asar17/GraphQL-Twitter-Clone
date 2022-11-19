import React from 'react';
import {Link} from 'react-router-dom'
import {CreateProfile,UpdateProfile,LeftNav,Following,PopularTweets} from'../components'
import {ME_QUERY} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import '../styles/primary.css'
import '../styles/profile.css'


const Profile =()=>{
    const {loading,error,data} = useQuery(ME_QUERY)
    if(loading) return <p>Loading....</p>
    if(error) return <p>{error.message}</p>
    if(data){
        console.log(data)
    }
    return(
        <>
            <div className="primary">
                {/* left div */}
                <div className="left">
                    <LeftNav/>
                </div>
                {/* center div */}
                <div className="profile">
                    {/*first child */}
                    <div className="profile-info">
                        {/*profile name */}
                        <div className="profile-head">
                            <span className="back-arrow">
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </span>
                            <span className="nickname">
                                <h4>{data.me.name}</h4>
                            </span>
                        </div>
                        {/*profie avatar */}
                        <div className="avatar">
                            {
                             data?.me?.Profile?.avatar?
                              (<img
                                src={data.me.Profile.avatar}
                                style={{ width: "150px",height:'150px',backgroundSize:'cover' ,borderRadius: "50%" }}
                                alt="avatar"
                              />):
                              ( <i className="fa fa-user fa-5x" aria-hidden="true"></i>)
                            }
                        </div>
                        <div className="make-profile">
                            {
                             data.me.Profile?
                               (<UpdateProfile/>):
                               (<CreateProfile/>)
                            }
                        </div>
                        {/*user name */}
                        <h4 className="name">{data.me.name}</h4>
                        {/*user website */}
                        {data.me.Profile ?
                        (
                            <p>
                            <i className="fas fa-link"> </i>{" "} 
                            <Link to={{pathname:`http://${data.me.Profile.website}`}}>
                                {data.me.Profile.website}
                            </Link>
                            </p>
                        ):
                        null
                        }
                        {/*users followers */}
                        <div className="followers">
                            <Following style={{marginTop:'16px'}}/>
                            <p>384 followers</p>
                        </div>
                    </div>
                    {/*second child*/}
                    {/* <LikedTweets/> */}
                </div>
                {/* right div */}
                <div className="right">
                    <PopularTweets/>
                </div>
            </div>
            
        </>
    )
}
export default Profile
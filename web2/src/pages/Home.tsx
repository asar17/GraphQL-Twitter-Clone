import React from 'react';
import {Link} from 'react-router-dom'
import {LeftNav,AllTweets,HomePageTweet,PopularTweets} from'../components'
import {ME_QUERY} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import '../styles/primary.css'
import '../styles/home.css'
const Home =()=>{
    return(
        
        <div className="primary">
            {/* left div */}
            <div className="left">
                <LeftNav/>
            </div>
            <div className="home">
                <div className="home-header">
                    <h3 className="home-title">Home</h3>
                </div>
                    <HomePageTweet/>
                    <AllTweets/>
            </div>
            {/* right div */}
            <div className="right">
                <PopularTweets/> 
            </div>
        </div>
    )
}
export default Home
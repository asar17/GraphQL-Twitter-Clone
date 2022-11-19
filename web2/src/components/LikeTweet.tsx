import React from 'react'
import {LIKE_TWEET_MUTATION} from '../graphqlOperation/mutations'
import {ALL_TWEETS,ME_QUERY} from '../graphqlOperation/queries'

import {useMutation} from '@apollo/client'

//types likeTweet props
interface LikeTweetProps{
    id:number
}

const LikeTweet =({id}:LikeTweetProps)=>{
    const [createLike]=useMutation(LIKE_TWEET_MUTATION,{
        refetchQueries: [ { query: ALL_TWEETS }, { query: ME_QUERY } ]
    })
    //create like
    const handleCreateLike =async()=>{
      await createLike({variables:{id}})
    }
    return(
        <span onClick={handleCreateLike} style={{ marginRight: "3px" }}>
			<i className="far fa-thumbs-up" aria-hidden="true" />
		</span>
    )
}
export default LikeTweet
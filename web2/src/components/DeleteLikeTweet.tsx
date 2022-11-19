import React from 'react'
import {DELETE_LIKE_TWEET_MUTATION} from '../graphqlOperation/mutations'
import {ALL_TWEETS,ME_QUERY} from '../graphqlOperation/queries'

import {useMutation} from '@apollo/client'

//types likeTweet props
interface DeleteLikeTweetProps{
    id:number
}

const DeleteLikeTweet =({id}:DeleteLikeTweetProps)=>{
    const [deleteLike]=useMutation(DELETE_LIKE_TWEET_MUTATION,{
        refetchQueries: [ { query: ALL_TWEETS }, { query: ME_QUERY } ]
    })
    //delete like
    const handleDeleteLike =async()=>{
      await deleteLike({variables:{id}})
    }
    return(
        <span onClick={handleDeleteLike} style={{ marginRight: "3px" }}>
			<i className="fas fa-thumbs-up" aria-hidden="true" />
		</span>
    )
}
export default DeleteLikeTweet
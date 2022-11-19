import React from 'react'
import {useQuery} from '@apollo/client'
import {USERS_QUERY} from '../graphqlOperation/queries'
const Users =()=>{
    const {loading,error,data}=useQuery(USERS_QUERY)
    if(loading) return <p>Loading....</p>
    if(error) return <p>{error.message}</p>
    interface User{
    name:string
    }
    return(
        <div>
            {data.users.map((user:User)=>{
                return(
                    <p>{user.name}</p>
                )
            })}
        </div>
    )
}
export default Users
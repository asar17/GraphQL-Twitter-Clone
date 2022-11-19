import React from 'react'
import {IS_LOGGED_IN} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import { useNavigate } from 'react-router-dom'

//types props
interface IsAuthenticatedPropsType{
    children:React.ReactNode
}
const IsAuthenticated =({children}:IsAuthenticatedPropsType)=>{
    const navigate=useNavigate()
    const {loading,error ,data}=useQuery(IS_LOGGED_IN)
    console.log(data?.me)
    if(loading) return <p>Loading....</p>
    if(error) return <p>{error.message}</p>
    if(!data.me) {
        navigate('./landing')
    }
    return(
        <>
          {children}
        </>
    )

}
export default IsAuthenticated 
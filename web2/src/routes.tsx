import React from 'react'
import {Users,Landing,IsAuthenticated} from './components'
import {Login,Signup,Profile,Home,SingleTweet} from './pages'
export const routes=[
    {path:"/",element:<Home/>},
    {path:"/users",element:<IsAuthenticated><Users/></IsAuthenticated>},
    {path:"/landing",element:<Landing/>},
    {path:"/signup",element:<Signup/>},
    {path:"/login",element:<Login/>},
    {path:"/profile",element:<Profile/>},
    {path:"/tweet/:id", element:<SingleTweet/>}
]
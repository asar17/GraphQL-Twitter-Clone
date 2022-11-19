import React,{useState} from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import * as Yup from 'yup'
import {LOGIN_MUTATION} from '../graphqlOperation/mutations'
import {useMutation} from '@apollo/client'
import {useNavigate,Link} from 'react-router-dom'
import TwitterLogo  from '../styles/assets/twitter-logo.png'
import '../styles/login.css'

//types form values
 interface LoginValuesType{
    email:string;
    password:string;
 
}
// type setSubmitting method
interface SubmitType{
    setSubmitting:(isSubmitting:boolean)=>void
}
const Login =()=>{ 
     const navigate=useNavigate()
    const [login,{data}]=useMutation(LOGIN_MUTATION)
    
    const [initialValues,setInitialValues]=useState<LoginValuesType>({
        email:" ",
        password:"",
    })
   
    const validationSchema=Yup.object({
        email:Yup.string().email("Invalid Email").required("Email Required"),
        password:Yup.string().min(5,"Password Must be 6 character or more").required("Password Required"),
       
    });
    //login user
    const handleSubmit=async(values:LoginValuesType,setSubmitting:SubmitType)=>{
       const res=await login({variables:values})
       localStorage.setItem('token',res.data.login.token)
       console.log('res',res)
       navigate('/')
    }
    return(
        <div className="container">
            <img
              src={TwitterLogo}
              alt='Twitter-Logo'
              style={{width:'50px'}}
              className="logo"
            />
            <h3>Log in fake twitter</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
         
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email"/>
                    <ErrorMessage name="email" component={'div'}/>
                    
                    <Field name="password" type="password" placeholder="Password"/>
                    <ErrorMessage name="password" component={'div'}/>

                    <button type="submit" className="login-btn">
                        <span>Login</span>
                    </button>

                </Form>

            </Formik>
            <div className="register">
                <h4>Don't have an account?</h4>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
export default Login
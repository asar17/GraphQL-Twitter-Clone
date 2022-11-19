import React,{useState} from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import * as Yup from 'yup'
import {SIGNUP_MUTATION} from '../graphqlOperation/mutations'
import {useMutation} from '@apollo/client'
import {useNavigate,Link} from 'react-router-dom'
import TwitterLogo  from '../styles/assets/twitter-logo.png'
import '../styles/login.css'



//types form values
 interface SignupValuesType{
    email:string;
    name:string;
    password:string;
    confirmPassword:string; 
}
// type setSubmitting method
interface SubmitType{
    setSubmitting:(isSubmitting:boolean)=>void
}
const Signup =()=>{ 
     const navigate=useNavigate()
    //add new user to database by mutation
    const [signup,{data}]=useMutation(SIGNUP_MUTATION)
    
    const [initialValues,setInitialValues]=useState<SignupValuesType>({
        email:" ",
        name:" ",
        password:"",
        confirmPassword:"",
    })
   
    const validationSchema=Yup.object({
        email:Yup.string().email("Invalid Email").required("Email Required"),
        password:Yup.string().min(5,"Password Must be 6 character or more").required("Password Required"),
        confirmPassword:Yup.string().oneOf(
            [Yup.ref("password")],
            "Password Must Match"
        ).required("Confirm Password Required"),
        name:Yup.string().min(4,"Name Must be 5 character or more").required("Name Required"),
    });
    //signup user
    const handleSubmit=async(values:SignupValuesType,setSubmitting:SubmitType)=>{
       const res=await signup({variables:values});
       localStorage.setItem('token',res.data.signup.token)
       navigate('/')
       console.log('athar')

    }
    return(
        <div className="container">
             <img
              src={TwitterLogo}
              alt='Twitter-Logo'
              style={{width:'50px'}}
              className="logo"
            />
            <h3>Signup</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
         
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email"/>
                    <ErrorMessage name="email" component={'div'}/>
                    
                    <Field name="name" type="text" placeholder="Name"/>
                    <ErrorMessage name="name" component={'div'}/>
                    
                    <Field name="password" type="password" placeholder="Password"/>
                    <ErrorMessage name="password" component={'div'}/>
                    
                    <Field name="confirmPassword" type="password" placeholder="Confirm Password"/>
                    <ErrorMessage name="confirmPassword" component={'div'}/>

                    <button type="submit" className="login-btn">
                        <span>Signup</span>
                    </button>

                </Form>

            </Formik>
            <div className="login">
                <h4>Already have an account ?</h4>
                <Link to="/login">Log in</Link>
            </div>
        </div>
    )
}
export default Signup
import React from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import * as Yup from 'yup'
import {CREATE_TWEET_MUTATION} from '../graphqlOperation/mutations'
import {ALL_TWEETS} from '../graphqlOperation/queries'
import {useMutation} from '@apollo/client'
//import "../styles/tweet.css"


//types tweet
interface TweetValues {
    content: string
  }
const HomePageTweet =()=>{
    const [createTweet]=useMutation(CREATE_TWEET_MUTATION,{
      refetchQueries:[{query:ALL_TWEETS}]
    })
    const initialValue={
       content:""
    }
    const validationSchema =Yup.object({
        content:Yup.string()
                  .required()
                  .min(1, "Must be more than 1 character")
                  .max(256, "Must be less than 257 characters"),
    })
    const handleSubmit =async(values:TweetValues)=>{
        await createTweet({variables:values})
        values.content="What's happening..."
    }
    return(
      <div className="home-page-tweet">
           <Formik
             initialValues={initialValue}
             validationSchema={validationSchema}
             onSubmit={handleSubmit}
            >
                    <Form>
                       <Field name="content" type="text" as="textarea" style={{borderColor:'white'}} placeholder="What's happening..."/>
                       <ErrorMessage name="content" component={"div"} /> 
                       <button type="submit" className="home-tweet-button">
                           <span>Tweet</span>
                       </button>
                    </Form>
            </Formik>
            <div className="footer"/>

      </div>
    )
}
export default HomePageTweet
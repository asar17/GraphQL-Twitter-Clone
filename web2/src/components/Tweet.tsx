import React,{useState} from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import Modal from 'react-modal'
import * as Yup from 'yup'
import { customStyles } from "../styles/CustomModalStyles"
import {CREATE_TWEET_MUTATION} from '../graphqlOperation/mutations'
import {useMutation} from '@apollo/client'
import {ALL_TWEETS} from '../graphqlOperation/queries'

import '../styles/tweet.css'

//types tweet
interface TweetValues {
    content: string
  }
const Tweet =()=>{
    const [modalIsOpen,setModalIsOpen]=useState(false)
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
        setModalIsOpen(false)
    }
    const openModal =()=>{
        setModalIsOpen(true)
    }
    const closeModal =()=>{
        setModalIsOpen(false)
    }
    return(
        <div>
            <button style={{marginRight:'10px',marginTop:'30px'}} onClick={openModal}>
                <span style={{ padding: "15px 70px 15px 70px" }}>Tweet</span>
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Modal"
              style={customStyles}
            >
                <span className="exit" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
                <div className="header"></div>
                <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                    <Form>
                       <Field name="content" type="text" as="textarea" placeholder="What's happening..."/>
                       <ErrorMessage name="content" component={"div"} /> 
                       <div className="footer"></div>
                       <button type="submit" className="tweet-button">
                           <span>Tweet</span>
                       </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}
export default Tweet;
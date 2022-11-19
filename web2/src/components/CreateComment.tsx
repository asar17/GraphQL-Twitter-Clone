import React,{useState} from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import Modal from 'react-modal'
import * as Yup from 'yup'
import { customStyles } from "../styles/CustomModalStyles"
import {CREATE_COMMENT_MUTATION} from '../graphqlOperation/mutations'
import {useMutation,useQuery} from '@apollo/client'
import {ALL_TWEETS,ME_QUERY} from '../graphqlOperation/queries'

import '../styles/tweet.css'

//types createComment
interface commentValues {
    content: string
  }
//types createComment props
interface CreateCommentProps{
    avatar:string
    name:string
    tweet:string
    id:number
}
const CreateComment =({avatar,name,tweet,id}:CreateCommentProps)=>{
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const { loading, error, data } = useQuery(ME_QUERY)

    const [createComment]=useMutation(CREATE_COMMENT_MUTATION,{
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
    const handleSubmit =async(values:commentValues)=>{
        await createComment({variables:{...values,id}})
        setModalIsOpen(false)
    }
    const openModal =()=>{
        setModalIsOpen(true)
    }
    const closeModal =()=>{
        setModalIsOpen(false)
    }
    if (loading) return <p>Loading...</p>
	if (error) return <p>{error.message}</p>
    return(
        <div>
            <span onClick={openModal}>
				<i className="far fa-comment" aria-hidden="true" />
			</span>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Modal"
              style={customStyles}
            >
                <span className="exit" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </span>
                <div className="header"/>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 8fr", marginTop: "10px" }} >
                    <img
                      src={avatar}
                      style={{ width: "40px", borderRadius: "50%" }}
                      alt="avatar"
                    />
                    <h5>{name}</h5>
                </div>
                <p
                  style={{
                    borderLeft: "1px solid var(--accent)",
                    marginLeft:'20px',
                    paddingLeft:'20px',
                    marginTop:'0',
                    height:'50px',
                  }}
                >
                    {tweet}
                </p>
                <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                    <Form>
                        <img
                         src={data.me.Profile.avatar}
                         style={{ width: "40px", borderRadius: "50%" }}
                         alt="avatar"
                        />
                       <Field name="content" type="text" as="textarea" placeholder="Tweet your Reply..."/>
                       <ErrorMessage name="content" component={"div"} /> 
                       <div className="footer"></div>
                       <button type="submit" className="tweet-button">
                           <span>Reply</span>
                       </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}
export default CreateComment;
import React,{useState} from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import {useMutation} from '@apollo/client'
import {CREATE_PROFILE_MUTATION} from '../graphqlOperation/mutations'
import {ME_QUERY} from '../graphqlOperation/queries'
import Modal from 'react-modal'
import { customStyles } from "../styles/CustomModalStyles"


interface InitialValuesTypes{
    bio:string
    location:string
    website:string
    avatar:string
} 
const CreateProfile =()=>{
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [createProfile]=useMutation(CREATE_PROFILE_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }],
      })

    const initialValues:InitialValuesTypes={
        bio:"",
        location:"",
        website:"",
        avatar:""
    }
    //create new profile
    const handleSubmit =async(values:InitialValuesTypes)=>{
        await createProfile({variables:values})
        setModalIsOpen(false)
    }
    //open model
    const openModel =()=>{
        setModalIsOpen(true)
    }
    //close model
    const closeModel =()=>{
        setModalIsOpen(false)
    }
    return(
        <div>
            <button onClick={openModel} style={{padding:'12px',paddingLeft:'20px',paddingRight:'20px'}}>Create Profile</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModel}
              contentLabel="Modal"
              style={customStyles}
            >
                <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                >
                    <Form>
                        <Field name="bio" type="text" as="textarea" placeholder="Bio" />
                        <ErrorMessage name="bio" component={"div"} />

                        <Field name="location" type="location" placeholder="Location" />
                        <ErrorMessage name="location" component={"div"} />

                        <Field name="website" type="website" placeholder="Website" />
                        <ErrorMessage name="website" component={"div"} />

                        <button type="submit" className="login-btn">
                            <span>Create Profile</span>
                        </button>
                    </Form>

                </Formik>
            </Modal>
        </div>
    )

}
export default CreateProfile
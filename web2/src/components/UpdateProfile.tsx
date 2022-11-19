import React,{useState,useRef} from 'react'
import {ErrorMessage,Field,Form,Formik} from 'formik'
import {ME_QUERY} from '../graphqlOperation/queries'
import {useMutation,useQuery} from '@apollo/client'
import {UDDATE_PROFILE_MUTATION} from '../graphqlOperation/mutations'
import Modal from 'react-modal'
import { customStyles } from "../styles/CustomModalStyles"

//types form 
interface InitialValuesTypes{
    id:number
    bio:string
    location:string
    website:string
    avatar:string
} 
const UpdateProfile =()=>{
    const inputFile=useRef<HTMLInputElement | null>(null)
    const [img,setImg]=useState("")
    const [imgLoading,setImgLoading]=useState(false)
    const {loading,error,data}=useQuery(ME_QUERY)
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [updateProfile]=useMutation(UDDATE_PROFILE_MUTATION,{
        refetchQueries:[
            {query:ME_QUERY}
        ]
    })

    const initialValues:InitialValuesTypes={
        id:data?.me?.Profile?.id,
        bio:data?.me?.Profile?.bio,
        location:data?.me?.Profile?.location,
        website:data?.me?.Profile?.website,
        avatar:data?.me?.Profile?.avatar
    }
    if(loading) return <p>Loading...</p>
    if(error) return   <p>{error.message}</p>
    //create new profile
    const handleSubmit =async(values:InitialValuesTypes)=>{
        await updateProfile({variables:{...values,avatar:img}})
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
    //upload image
    const uploadImg =async(e: React.ChangeEvent<HTMLInputElement>)=>{
       const  files =e.target.files
       const formData=new FormData()
       formData.append("file",files[0])!
       formData.append('upload_preset','ml_default')!
       setImgLoading(true)
        const options = {
            method: 'POST',
            body: formData,
        };
       const res=await fetch("https://api.Cloudinary.com/v1_1/dbszli2tl/image/upload",options)
       const file=await res.json()
       setImg(file.secure_url)
       setImgLoading(false)
    }
    return(
        <div>
            <button onClick={openModel} className="edit-button">Edit Profile</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModel}
              contentLabel="Modal"
              style={customStyles}
            >
                {/*upload image */}
                <input
                 type="file"
                 name="file"
                 placeholder="Upload Your Avatar"
                 onChange={uploadImg}
                 ref={inputFile}
                 style={{display:"none"}}
                />
                {
                    imgLoading?
                    (<h4>Loading....</h4>)
                     :
                    (
                        <>
                        {
                          img?
                            (
                                <span onClick={() => inputFile?.current?.click()}>
                                    <img
                                      src={img}
                                      style={{ width: "150px",height:'150px', borderRadius: "50%" ,marginBottom:'10px'}}
                                      alt="avatar"
                                      onClick={() => inputFile?.current?.click()}
                                    />
                                </span>
                            )
                             :
                            (
                                <span onClick={() => inputFile?.current?.click()}>
                                    <i 
                                     className="fa fa-user fa-5x" 
                                     aria-hidden="true"
                                     style={{marginBottom:'10px'}}
                                     onClick={() => inputFile?.current?.click()}
                                     >
                                     </i>
                                </span>
                            )
                         }
                        </>
                    )

                }
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
                            <span>Edit Profile</span>
                        </button>
                    </Form>

                </Formik>
            </Modal>
        </div>
    )

}
export default UpdateProfile
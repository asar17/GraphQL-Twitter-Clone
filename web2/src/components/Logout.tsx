import React,{useState} from 'react'
import {ME_QUERY} from '../graphqlOperation/queries'
import {useQuery} from '@apollo/client'
import Modal from 'react-modal'
import { customStyles } from "../styles/ModalLogout"
import { useNavigate } from 'react-router-dom'
import '../styles/logout.css'


const Logout =()=>{
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const {loading,error,data} = useQuery(ME_QUERY)
    const navigate=useNavigate()

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    const openModal =()=>{
        setModalIsOpen(true)
    }
    const closeModal =()=>{
        setModalIsOpen(false)
    }
    const handleLogout =async()=>{
        localStorage.removeItem("token")
        navigate('/login')
    }
    return(
        <div className="logout">
            <span onClick={openModal} style={{ flex: 1, flexDirection: "row"}}>
              <h4>
                {
                   !data?.me?.Profile?.avatar?
                   (
                    <i 
                      className="fa fa-user fa-5x"
                      aria-hidden="true"
                      style={{fontSize:'35px',marginLeft:'10px'}}
                     >
                     </i>
                   )
                   :
                   (
                    <img
                      src={data.me.Profile?.avatar}
                      style={{width:'40px',height:'45px',borderRadius:"50%"}}
                      alt="avatar"
                     />
                   )
                }
                <span style={{marginLeft:'10px',marginTop:'-10px'}}>
                    {data.me.name}
                </span>
                <span style={{ marginLeft: "30px" }}>
                    <i className="fas fa-ellipsis-h"></i>
                </span>
              </h4>
            </span>
            <div style={{ position: "absolute", bottom: 0 }}>
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={customStyles}
                >
                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                        <p style={{ borderBottom: "1px solid black" }}>
                        Log out @{data.me.name}
                        </p>
                    </span>
                </Modal>
            </div>
        </div>
    )
}
export default Logout
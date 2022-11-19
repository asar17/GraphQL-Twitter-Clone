import React from 'react'
import Tweet from './Tweet'
import Logout from './Logout'
import TwitterLogo from '../styles/assets/twitter-logo.png'
import {Link} from 'react-router-dom'
import '../styles/leftnav.css'
const LeftNav =()=>{
    return(
        <div style={{paddingLeft:'40px',marginTop:"25px"}}>
            <Link to='/'>
                <img
                  src={TwitterLogo}
                  alt="logo"
                  style={{width:'40px'}}
                />
            </Link>
            <Link to="/">
                <h2>
					<i className="fa fa-home" aria-hidden="true" /> <span className="title">Home</span>
				</h2>
            </Link>
            <Link to="/profile">
                <h2>
					<i className="fa fa-user" aria-hidden="true" /> <span className="title">Profile</span>
				</h2>
            </Link>
            <Link to="/users">
				<h2>
					<i className="fa fa-envelope" aria-hidden="true" /> <span className="title">Messages</span>
				</h2>
			</Link>
			<Link to="/users">
				<h2>
					<i className="fa fa-bell" aria-hidden="true" /> <span className="title">Notifications</span>
				</h2>
			</Link>
			<Link to="/users">
				<h2>
					<i className="fa fa-ellipsis-h" aria-hidden="true" /> <span className="title">More</span>
				</h2>
			</Link>
			<Tweet />
			<Logout />  
        </div>
    )
}
export default LeftNav
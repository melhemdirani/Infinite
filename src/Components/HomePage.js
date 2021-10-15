import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setUserName } from '../redux/user/user.actions';

function HomePage({setUserName, userName}) {
  const [inputValue, setInputValue] = useState({ username: "", email: "" , password: ""});
  const {username, email, password} = inputValue

  const Form = ({register, title}) => (
    <form className="register_form">
      <h1>{title}</h1>
      { register &&
        <input type="name" className="form_input" value={username} name="username" onChange={handleChange} placeholder="Full Name"/>
      }
      <input type="email" className="form_input" value={email} name="email" onChange={handleChange} placeholder="Email"/>
      <input type="password" className="form_input" value={password} name="password" onChange={handleChange} placeholder="Password"/>
      <Link to="/calculations">
        { register 
          ?<button> Sign Up</button>
          :<button> Sign In</button>
        }
      </Link>
    </form>
  )

  const handleChange = (e) => {
    console.log("change")
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(()=>{

    setUserName(inputValue.username)

  },[inputValue.username])
  return (
    <div>
      {Form({register: true, title: "Register"})}
      {Form({register: false, title: "Signin"})}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setUserName: (username) => dispatch(setUserName(username)),
});
const mapStateToProps = (state) => ({
  userName: state.user.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);



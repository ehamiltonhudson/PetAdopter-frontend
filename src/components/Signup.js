import React from 'react';
import { Redirect } from "react-router-dom";
// import '../App.scss'

const apiUsersAddress = 'http://localhost:3000/api/v1/users'

class Signup extends React.Component {
  state = {
    username: '',
    name: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const postConfig = {
    	method:"POST",
    	headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          name: this.state.name,
          password:this.state.password
        }
      })
    }
    fetch(apiUsersAddress, postConfig)
    .then(r => r.json())
    .then(userObj => {
      localStorage.setItem('jwt', userObj.token)
      this.props.setCurrentUser(userObj)
    })
  }

  render() {
    const signUpForm =
      <div className="signupDiv">
        <h1 className="signupHeader">Sign Up To Save Pets!</h1>
        <br/><br/>
        <div className="login">
          <form onSubmit={this.handleSubmit} className="signupForm">
            <input
              onChange={this.handleChange}
              name="name"
              type="text"
              value={this.state.name}
              placeholder="name"
            />
            <input
              onChange={this.handleChange}
              name="username"
              type="text"
              value={this.state.username}
              placeholder="username"
            />
            <input className="signupPlaceholders"
              onChange={this.handleChange}
              name="password"
              type="password"
              value={this.state.password}
              placeholder="password"
            /><br/><br/><br/><br/>
            <input onClick={this.props.handleClick}
              type="submit"
              className="signupButton"
            />
          </form>
        </div>
      </div>
    return this.props.currentUser ? <Redirect to="/" /> : signUpForm
  }
}

export default Signup;

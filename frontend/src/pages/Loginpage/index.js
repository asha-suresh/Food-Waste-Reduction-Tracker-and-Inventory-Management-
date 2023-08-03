import React from 'react'
import Header from '../../Components/Header'

const Login = () => {
  return (
    <div>
      <Header></Header>
      <div className="main_container">
        <div className="slogenbox">
            <div className="slogen1">FOOD WASTE REDUCTIONTRACKER</div>
            <div className="slogen2">From Waste to Wonder: Reducing Food Waste, Managing Costs, and Sharing the Bounty with Those in Need</div>
      </div>
      <div className="loginbox">
      <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username"></input>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password"></input>
      </div>
      <div class="form-group">
        <button type="submit">Login</button>
      </div>
    </form>
      
      </div>
      </div>
    </div>
  )
}

export default Login

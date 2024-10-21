import React, { useEffect } from 'react'
import { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../style/style.css'

const Login = () => {

let navigate = useNavigate()
let login = useRef()    

useEffect(()=>{

},[])

let handleLogin = (e) => {
  e.preventDefault();  // Prevent default form submission

  let userlogin = {
      username: login.current[0].value,
      password: login.current[1].value
  };

  fetch(`http://localhost:3001/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userlogin)
  })
  .then(data => data.json())
  .then((res) => {
      // Check for successful login
      if (res.message === 'success') {
          if (res.role === 'admin') {
              navigate('/admin');  // Navigate to admin page
          } else {
              navigate(`/normaluser/${res.id}`);  // Navigate to normal user page
              console.log(res.id);
          }
      } else {
          // Handle errors (user not found or password incorrect)
          alert(res.message);  // You can replace this with a more user-friendly notification
      }
  })
  .catch(err => {
      console.error(err);
      alert('An error occurred. Please try again.');  // Handle fetch errors
  });
};


  return (
    <>
    <div className="login">
      <h1>Login</h1>
        <form action="" onSubmit={handleLogin} ref={login}>
            <input type="text" placeholder='username' required/>
            <input type="text" placeholder='password' required/>
            <button type='submit'>Login</button>
            <NavLink to="/">Register Here</NavLink>
        </form>

    </div>
    </>
  )
}

export default Login
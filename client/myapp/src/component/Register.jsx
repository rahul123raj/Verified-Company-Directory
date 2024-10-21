import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../style/style.css'

const Register = () => {

  let navigate = useNavigate()
    let register = useRef()

    let handleSubmit = (e) =>{
        e.preventDefault()
        console.log(register)
        
        let user = {
            name : register.current[0].value,
            username : register.current[1].value,
            password : register.current[2].value,
            role : register.current[3].checked ? register.current[3].value : register.current[4].value,
            email : register.current[5].value,
            mobile : register.current[6].value
        }

        fetch(`http://localhost:3001/register`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
          })
          .then( data => console.log('success'))
          .catch(err => console.log(err))

          navigate('/login')
    }

  return (
    <>
    <div className="register">
      <h1>Register </h1>
        <form action="" onSubmit={handleSubmit} ref={register}>
            <input type="text" placeholder='Name' required/>
            <input type="text" placeholder='username' required/>
            <input type="text" placeholder='password' required/>
            <div className="radio">
            <label htmlFor="">Role : </label>
            <div className="radiobtn">

            <div className="admin">
            <label htmlFor="radio">IT_ADMIN</label>
            <input type="radio" value="IT_ADMIN" name='role'required />
            </div>

            <div className="user">
            <label htmlFor="radio">IT_NORMAL_USER</label>
            <input type="radio" value="IT_NORMAL_USER" name='role' required/>
            </div>

            </div>
            </div>
            <input type="text" placeholder='email' required/>
            <input type="text" placeholder='mobile Number'required />
            <button type='submit'>Register</button>
            <NavLink to="/login">Already have an account.</NavLink>

        </form>
    </div>
    </>
  )
}

export default Register
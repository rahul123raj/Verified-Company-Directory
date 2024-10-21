import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom'

const CreateCompany = () => {

    let location = useLocation()
    let path = location.pathname
    let bool = path.startsWith('/admin')

    let create = useRef()

    let handleSubmit = (e) =>{
        e.preventDefault()

        let company = {
            name : create.current[0].value,
            address : create.current[1].value,
            username : create.current[2].value,
            status : bool ? 'approved' : 'unapproved'
        }

        fetch('http://localhost:3001/company',{
            method : 'POST',
            headers : {'content-type' : 'application/json'},
            body: JSON.stringify(company)
        })
        .then(data => data.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }

  return (
    <>
    <div className="createcomapany">
        <h2>Enter Company Details</h2>
        <form action="" onSubmit={handleSubmit} ref={create}>
            <input type="text" placeholder='Comapny Name'required />
            <input type="text" placeholder='address' required/>
            <input type="text" placeholder='username'required />
            
            <button type='submit'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default CreateCompany
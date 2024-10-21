import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditCompany = () => {
  const {c_id} = useParams()

  let edit = useRef()

  let [company,setCompany] = useState({
    name: '',
    address: '',
    created_by: '',
  })

  useEffect(()=>{
    fetch(`http://localhost:3001/company/${c_id}`)
    .then(res => res.json())
    .then(data => setCompany(data))
    .catch(err => console.log(err))
  },[c_id])

  let handleEdit = (e) =>{
    e.preventDefault()

    const updatedCompany = {
      name : edit.current[0].value,
      address : edit.current[1].value,
      username : edit.current[2].value
    }

    fetch(`http://localhost:3001/company/${c_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCompany),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Updated Company:', data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
        <div className="createcomapany">
          <h2>Edit Company Details</h2>
        <form action="" onSubmit={handleEdit}  ref={edit}>
            <input type="text" placeholder='Comapny Name' defaultValue={company.name} />
            <input type="text" placeholder='address' defaultValue={company.address} />
            <input type="text" placeholder='created_by' defaultValue={company.created_by} />
            
            <button type='submit'>Save</button>
        </form>
    </div>
    </>
  )
}

export default EditCompany
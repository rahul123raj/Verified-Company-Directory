import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'

const CompanyList = () => {

// console.log(uid)

  let [companies, setCompany] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:3001/company`)
    .then(res => res.json())
    .then(data => setCompany(data))
    .catch(err => console.log(err))
  },[])

  let [createdby, setCreatedBy] = useState("");
  let { uid } = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:3001/normaluser/${uid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        return res.json();
      })
      .then((data) => {
        setCreatedBy(data);
        console.log(data)
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, [uid]);

  let [userCompanies,setuserComapany ] = useState([])
  // Filter the companies to show only those created by this user
  useEffect(() => {
    if (createdby.username) {  // Ensure `createdby.username` is available
      const filteredCompanies = companies.filter(
        company => company.username === createdby.username
      );
      console.log('Companies created by:', createdby.username, filteredCompanies);
      // console.log(companies)
      setuserComapany(filteredCompanies)
    }
  }, [createdby, companies]);  // Run this effect whenever `createdby` or `companies` change
  
  let location = useLocation()
  let path = location.pathname
  let bool = path.startsWith(`/admin`)
  // console.log(createdby.id)

  //! Delete btn
  let handleDelete = (id) =>{
    fetch(`http://localhost:3001/company/${id}`,{
      method : 'Delete'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCompany(companies.filter(company => company._id !== id))
    })
    .catch(err => console.log(err))
    
  }
//! handle approve btn

let handleApprove = (id) => {
  const approved = {
    status: 'approved', // This will be sent to the server
  };

  fetch(`http://localhost:3001/approve/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(approved), // Send updated status to the server
  })
    .then((res) => res.json())
    .then((updatedCompany) => {
      // Update the company list to reflect the status change locally
      const updatedCompanies = companies.map((company) =>
        company._id === id ? { ...company, status: updatedCompany.status } : company
      );
      setCompany(updatedCompanies); // Update state with the new status
    })
    .catch((err) => console.log(err));
};

  return (
    <>
    <div className="list">
    <table className="styled-table">
      <thead>
        <tr>
          <th>Sr no.</th>
          <th>Company Name</th>
          <th>Address</th>
          <th>created_by</th>
          {
            bool ? <th colSpan={3}>Actions</th> : <th>Status</th>
          }
        </tr>
      </thead>
      <tbody>
      {

          bool ?
          companies.map((elem,i)=>{
            
            return(
              <>
                <tr>
                  <td>{i+1}</td>
                  <td>{elem.name}</td>
                  <td>{elem.address}</td>
                  <td>{elem.username}</td>
                  
                    
                    <td><NavLink to={`/admin/companyList/${elem._id}`} >Edit</NavLink></td>
                  <td><button onClick={()=>{handleDelete(elem._id)}} >Delete</button></td>
                    {
                      elem.status === 'unapproved' ? 
                      <td><button onClick={()=>{handleApprove(elem._id)}}>Approve</button></td> :
                      <td></td>
                    }
                </tr>
              </>
            )
          })
          : 
          userCompanies.map((elem,i)=>{
            return(
              <>
              <tr>
                <td>{i+1}</td>
                <td>{elem.name}</td>
                <td>{elem.address}</td>
                <td>{elem.username}</td>
                <td>{elem.status}</td>
              </tr>
              </>
            )
          })
        }
      </tbody>
    </table>
    </div>
    </>
  )
}

export default CompanyList
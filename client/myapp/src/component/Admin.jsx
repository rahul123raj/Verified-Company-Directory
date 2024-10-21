import React from 'react'
import { NavLink } from 'react-router-dom'
import CompanyList from './CompanyList'
const Admin = () => {
  return (
    <>
    <div className="style">
    <NavLink id='a' to="/admin/createcompany">CreateCompany</NavLink>
    <CompanyList />
    </div>
    </>
  )
}

export default Admin
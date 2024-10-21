import React from 'react'
import { NavLink } from 'react-router-dom'
import CompanyList from './CompanyList'
import '../style/style.css'

const NormalUser = () => {
  return (
    <>
      <div className="style">
      <NavLink id='a' to="/normaluser/createcompany">CreateCompany</NavLink>
      <CompanyList />
      </div>
    </>
  )
}

export default NormalUser
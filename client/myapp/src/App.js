import Admin from "./component/Admin";
import CompanyList from "./component/CompanyList";
import CreateCompany from "./component/CreateCompany";
import EditCompany from "./component/EditCompany";
import Login from "./component/Login";
import NormalUser from "./component/NormalUser";
import Register from "./component/Register";
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Register />}  path="/"/>
      <Route element={<Login />} path="/login" />
      <Route element={<Admin />} path="/admin" />
      <Route element={<NormalUser />} path="/normaluser/:uid" />
      <Route element={<CreateCompany />} path="/admin/createcompany" />
      <Route element={<CreateCompany />} path="/normaluser/createcompany" />
      <Route element={<CompanyList />} path="/admin/companyList" />
      <Route element={<CompanyList />} path="/normaluser/companyList" />
      <Route element={<EditCompany />} path="/admin/companyList/:c_id" />
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;

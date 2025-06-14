
import Approuter from './Config/Router.jsx'
import './App.css'
import './index.css';
import { DataDonor } from "./Context/DataDonor";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
 <div>
  <DataDonor>
   <Approuter />
  <ToastContainer position="top-right" autoClose={3000} />
  </DataDonor>
 </div>
  )
}

export default App

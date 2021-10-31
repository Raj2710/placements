import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Student from "./components/student";
import Admin from './components/Admin';
import Jobs from './components/Jobs';
import CreateJob from './components/CreateJob';
import CreateStudent from './components/CreateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

export const apiurl = "https://placementshubapi.herokuapp.com"
export const JobContext = React.createContext(); 

function App() {

  let [data,setData] = useState([]);

  let getData = async()=>{
    let d = await axios.get(`${apiurl}/jobs`);
    // console.log(d.data.data)
    setData(d.data.data);
  }

  useEffect(()=>{
    getData();
  },[])


  return <>

  <Router>
    <JobContext.Provider value={{data}}>
      <Switch>
        <Route path="/admin/:id" component={Jobs}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/create-job" component={CreateJob}/>
        <Route path="/create-student" component={CreateStudent}/>
        <Route path="/:id" component={Student}/>
      </Switch>

    </JobContext.Provider>
  </Router>

  </>
}

export default App;

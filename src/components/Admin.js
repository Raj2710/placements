import React,{useContext} from 'react'
import { JobContext } from '../App'
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/Table'
function Admin() {

    let context = useContext(JobContext);
    console.log(context.data)
    return (
        <Table stripped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>Role</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                   context.data.length>0?context.data.map((e,i)=>{
                        let url = 'admin/'+e._id;
                        return <tr key={e._id}>
                            <td>
                                <Link to={url}>
                                    {i+1}
                                </Link>
                            </td>
                            <td>{e.companyName}</td>
                            <td>{e.roleName}</td>
                            <td>{e.desc}</td>
                        </tr>
                    }):""
                }
            </tbody>
        </Table>
    )
}

export default Admin




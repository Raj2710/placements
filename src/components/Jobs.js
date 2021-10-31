import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { apiurl } from '../App'

function Jobs(props) {

    const [context,setContext] = useState({})
    const id = props.match.params.id;
    
    let getJobDetails = async()=>{
        let d = await axios.get(`${apiurl}/jobs/${id}`)
        setContext(d.data.data)
    }


    useEffect(()=>{
        getJobDetails();
    })
    

    let handleReject = async(e)=>{
        await axios.put(apiurl+"/reject",{
            id:e,
            jobId:id
        })
        .then(res=>{
            console.log(res)
            getJobDetails();
        })
    }


    return (
           context._id? <>
                <Container fluid>
                    <Row>
                        <Col>Company Name</Col>
                        <Col>{context.companyName}</Col>
                    </Row>
                    <Row>
                        <Col>Role</Col>
                        <Col>{context.roleName}</Col>
                    </Row>
                    <Row>
                        <Col>Description</Col>
                        <Col>{context.desc}</Col>
                    </Row>
                    <Row>
                        <Col>Applied</Col>
                        <Col>
                            {
                                context.applicants.applied.map((e,i)=>{
                                    return <Row key={i}>
                                        <Col>
                                            {e}
                                        </Col>
                                        <Col>
                                        <Button variant="danger" onClick={()=>{
                                            handleReject(e)
                                        }
                                        }>Reject</Button>
                                        </Col>
                                    </Row>
                                })
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>Rejected</Col>
                        <Col>
                            {
                                context.applicants.rejected.map((e,i)=>{
                                    return <Row key={i}>
                                        <Col>
                                            {e}
                                        </Col>
                                    </Row>
                                })
                            }
                        </Col>
                    </Row>
                </Container>
            </>:<></>
    )
}

export default Jobs

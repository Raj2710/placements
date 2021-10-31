const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
const{dbUrl,mongodb,MongoClient} = require("../dbConfig");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/jobs',async(req,res)=>{

  //this is to get all the jobs posted by admin
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").find().toArray()
    res.send({
                message:"Jobs Fetched Successfully",
                data:data
              })
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})

router.get('/jobs/:id',async(req,res)=>{

  //this is to get job details by ID
  let id = req.params.id;
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").findOne({_id:ObjectId(id)})
    res.send({
                message:"Jobs Fetched Successfully",
                data:data
              })
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})

router.post('/jobs',async(req,res)=>{

  //this is to post the jobs by admin
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").insertOne(req.body)
    res.send({message:"Job Created Successfully!"})
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})

router.delete('/jobs/:id',async(req,res)=>{

  //this is to delete a job posted by admin
  let id = req.params.id;
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").deleteOne({_id:ObjectId(id)})
    res.send({
                message:"Job Deleted Successfully"
              })
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})

router.put('/jobs/:id',async(req,res)=>{

  //this is to delete a job posted by admin
  let id = req.params.id;
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").updateOne({_id:ObjectId(id)},{$set:{companyName:req.body.companyName,roleName:req.body.roleName,desc:req.body.desc}})
    res.send({
                message:"Job Updated Successfully",
              })
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})


//students route starts 

router.post('/create-student',async(req,res)=>{

  //this is to create a student signup in simplified way
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("students").insertOne(req.body)
    res.send({message:"Student Created Successfully!"})
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})

router.post('/apply',async(req,res)=>{

  //a student applying for a job
  // 1. Job ID from body
  // 2. Student ID from Body
  // 3. Map the Student ID in Applied object of applicant in jobs db
  //4. Map the Job ID to the jobs fied of Student DB
  let jobId = ObjectId(req.body.jobId);
  let id = ObjectId(req.body.id);
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").findOne({_id:jobId})
    {
        data.applicants.applied.push(id);
        let update = await db.collection("jobs").updateOne({_id:jobId},{$set:{applicants:data.applicants}})

        let sData = await db.collection("students").updateOne({_id:id},{$push:{jobs:jobId}});
        res.send({message:"Job Applied Successfully!"})
    }
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})

router.put('/reject',async(req,res)=>{

  //a student applying for a job
  // 1. Job ID from body
  // 2. Student ID from Body
  // 3. Delete the id from applied and add it to rejected

  let jobId = ObjectId(req.body.jobId);
  let id = ObjectId(req.body.id);
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = client.db("placements");
    let data = await db.collection("jobs").findOne({_id:jobId})
    data.applicants.rejected.push(id);
    data.applicants.applied.splice(data.applicants.applied.indexOf(id),1);
    let update = await db.collection("jobs").updateOne({_id:jobId},{$set:{applicants:data.applicants}})
    
    res.send({message:"Operation done Successfully!"})
 
  } catch (error) {
    console.log(error);
    res.send({message:"Internal Server Error"})
  }
  finally{
    client.close();
  }

})



module.exports = router;

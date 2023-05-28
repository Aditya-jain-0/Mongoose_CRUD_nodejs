const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myapp')  //default mongodb port
.then(()=>{console.log("Connection Successfull")})
.catch((err)=>{console.log(err)});

const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    type:String,
    projects:Number,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})
//create model
const Playlist = new mongoose.model("Playlist",playlistSchema)

//create documents

const createDocument = async()=>{
    try{
        const nodeJS = new Playlist({
            name : "Node JS",
            type : "Back End",
            projects : 5,
            active:true
        })
        const ExpressJS = new Playlist({
            name : "Express JS",
            type : "Back End",
            projects : 5,
            active:true
        })
        const ReactJS = new Playlist({
        name : "React JS",
        type : "Front End",
        projects : 2,
        active:true
        })
    const Mongodb= new Playlist({
        name : "MongoDB",
        type : "Database",
        projects : 4,
        active:true
        })
    const GraphQL = new Playlist({
        name : "Graph Ql",
        type : "API",
        projects : 0,
        active:true
        })
    
    // const result = await reactJS.save() //return promise
    const result = await Playlist.insertMany([nodeJS,ExpressJS,ReactJS,Mongodb,GraphQL])
    }catch(err){
        console.log(err)
    }
}

// createDocument();

const getDocument = async()=>{
    try{
    // const result = await Playlist.find();
    // const result = await Playlist.find({type:"Back End"});
    // const result = await Playlist.find({type:"Back End"}).select({name : 1}).limit(1); // name:1(display name if 0 display all except name)
    // const result = await Playlist.find({projects : {$gte : 2}})    //gte :- greater then equals to
    // const result = await Playlist.find({type : {$in : ["Back End","API"]}});in :- included
    // const result = await Playlist.find({type : {$nin : ["Back End","API"]}});nin :- not included
    const result = await Playlist.find({$or : [{type : "Back End"} , {projects : 0}] }) //or operation either one of the condition satisfies
    console.log(result)
    }catch(err){
        console.log(err)
    }
}
// getDocument();
const updateDocument = async(_id)=>{
    try{
        // const result = await Playlist.updateOne({_id},{   
        const result = await Playlist.findByIdAndUpdate({_id},{ //display which document is updated
            $set : {type : "Server Side bro"}
        },{
            new : true
        });
        console.log(result);
    }catch(err){
        console.log(err);
    }    
}
// updateDocument("6472f303b47b041bc63453fd");

const deleteDocument = async(_id) =>{
    try{
        const result  = await Playlist.findByIdAndDelete({_id});
        console.log(result);
    }catch(err){
        console.log(result);
    }
}
deleteDocument('6472f303b47b041bc6345401')
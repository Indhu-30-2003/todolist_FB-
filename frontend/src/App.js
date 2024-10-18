import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

 export default function App(){

  const [evalue,setevalue] = useState("")
  const [activity,setactivity] = useState([])
  useEffect(function(){
    axios.get("http://localhost:5000/activityList").then(function(data){
      console.log(data)
      setactivity(data.data)
    })
  },[])
  

  function handleevalue(evt){
    
    setevalue(evt.target.value)
  }

  function add(){
    if (!evalue) return;
    axios.post("http://localhost:5000/addactivity",{newactivity:evalue})
    setactivity([...activity,{name:evalue}])
    setevalue("")
  }

  function deleteActivity(id){
    console.log(id)
    axios.delete(`http://localhost:5000/deleteactivity/${id}`)
    .then(() => {
      setactivity(activity.filter((item) => item._id !== id)); 
    })
    .catch((error) => {
      console.error("Error deleting activity:", error);
    });
}
  
  return(<>
  <div id="container">
  <h1 id="container_heading">To-Do List</h1>
  <input type="text" placeholder="Enter Activity" onChange={handleevalue} value={evalue} id="evalueinput" />
  <button onClick={add} id="addbutton">Add</button>
  {
    activity.map(function(item,index){
      console.log(item)
      return(<>
      <div id="listcontainer">
        <ol id="itemslist"><li key={index} id="items"> {item.index }{item.name}</li></ol>
        <button onClick={() => deleteActivity(item._id)}  id="deletebutton">Delete</button></div></>)
    })
  }
  </div>
 
  </>)

}
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

import SelectedTagsContext from "./SelectedTagsContext";
import { useContext } from "react";


function Sidebar(){

    const [tags,setTags]=useState([]);
    const [error,setError]=useState(null);
    const navigate=useNavigate();


    
   const {Tags ,updateTags,filterByTags,updateFilterByTags,getAllPolls,updateGetAllPolls} =useContext(SelectedTagsContext);
   console.log(Tags);
   console.log(filterByTags);
   

    useEffect(() => {
        fetch('http://127.0.0.1:8000/polls/list_of_tags/')
             .then(response => response.json())
      
            .then(data => setTags(data.Tags))
            .catch(error => {
              setError(error.message);
              console.error('Error fetching polls:', error);
            });
      }, []);

    if (error) {
        return <div>Error: {error}</div>;
      }

  const handleCheckboxChange =(e) =>{
    const {checked ,value}=e.target;
    updateTags((prevTags) =>{
      if (checked) {
        return prevTags ? `${prevTags},${value}` : value;
      } else {
        return prevTags
          .split(',')
          .filter((tag) => tag !== value)
          .join(',');
      }
    });
  };

  const handleFilterClick =() =>{
    if(Tags.length >0){
      updateFilterByTags(true);
     }
    else{
      updateGetAllPolls(true);
      console.log(getAllPolls);
    }
  }

     
    return(
        <div>
                    <button className="button" id="Createpoll" onClick={() => navigate('/Creatpoll')}>Create polls</button>
        <div className="checkboxes" >
          <ul style={{ listStyleType: 'none',padding:0 }}>
          {tags.map((tag,index) => (

            <li key={index} className="checkbox-group">
              <input 
              type="checkbox" 
              id={`tag-${index}`} 
              name={`tag-${index}`} 
              value={tag} 
               onChange={handleCheckboxChange}
              />
              <label htmlFor={`tag-${index}`}>{tag}</label>
            </li>
          ))}
          </ul>
           <button class="btn-normal" onClick={handleFilterClick}>Filter by  tags</button>
          </div>
        </div>
      );
      
}
export default Sidebar;

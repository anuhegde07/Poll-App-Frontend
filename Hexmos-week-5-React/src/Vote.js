import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { useNavigate, useSearchParams } from "react-router-dom";

function Vote(){

    const [searchParams]=useSearchParams();
    const idString=searchParams.get('id');
    const poll_id=Number(idString)
    const [poll,setPolls]=useState([])
    const [error,setError]=useState(null);
    const navigate=useNavigate();
    
    const [selectedOption,setSelectedOption]=useState('')
    const [optionSelected,setOptionSelected]=useState(false);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/polls/${poll_id}/get_polls_by_id/`)
          .then(response => response.json())
          .then(data => setPolls(data))
          .catch(error => {
            setError(error.message);
            console.error('Error fetching polls:', error);
          });
     }, [poll_id]);
    
     if (error) {
        return <div>Error: {error}</div>;
     }
    
     // Ensure poll has the expected structure before rendering
     if (!poll.Question || !poll.OptionVote || !poll.Tags) {
        return <div>Loading...</div>;
     }

     const handleVote =() =>{
        const data={
            incrementOption:selectedOption
        }
        fetch(`http://127.0.0.1:8000/polls/${poll_id}/update_poll/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            
        })
        .catch(error => {
            setError((error.message));
            console.error('error updating poll::',error);
        });
        if(optionSelected){
            if(window.confirm(" Vote added Successfully! \n Do you want to go to home page?")){
            navigate('/');
            };
        }
        else{
            alert('select any option!!')
        }

     } 
     const handleOptionChange=(e)=>{
        setSelectedOption(e.target.value);
        setOptionSelected(true);
     }  
     

    return(
        <div>
        <Heading />
        <h1 class="heading">{poll.Question}</h1>
        {Object.entries(poll.OptionVote).map(([option],index) => (
            <div key={index} className="radio">
                <input type="radio" name="option" value={option} id={`radio-${index}`} onChange={handleOptionChange}/>
                <label htmlFor={`radio-${index}`}>{option}</label><br /><br />
            </div>
        ))}
            <button class="btn-normal" onClick={handleVote}>vote</button>
    </div>
    );

}

export default Vote;
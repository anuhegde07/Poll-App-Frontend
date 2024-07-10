import React from "react";
import Heading from "./Heading";
import { useState ,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { FaTimes } from "react-icons/fa";

function Createpoll(){
    const [question,setQuestion]=useState('');
    const [inputs,setInputs]=useState(['','']);
    const [tags,setTags]=useState('');
    const navigate=useNavigate();

    const [formCompleted, setFormCompleted] = useState(false);
    const addInput =() =>{
        setInputs([...inputs,'']);
    };

    const deleteInput=(index) =>{
        const newInputs=[...inputs];
        newInputs.splice(index,1);
        setInputs(newInputs);
    }

    const handleOptionChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleCreatpoll =()=>{
        if(formCompleted){
        const data={
            Question:question,
            OptionVote:inputs.reduce((acc,option) =>{
                acc[option]="0";
                return acc;
            },{}),
            Tags:tags.split(',').map(tag => tag.trim())
        };
        fetch('http://127.0.0.1:8000/polls/post_question/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
        .catch(error => {
            console.log(error);
        });
    }
        if(formCompleted){
            // eslint-disable-next-line no-restricted-globals
            if(confirm(" Question Added Successfully \n Do you want to go to home page?")){
                navigate('/');
            }
        }
        else{
            alert('Please fill in all fields'); 
        }
    };
    useEffect(() => {
        if (question && inputs.every(option => option.trim()) && tags) {
            if(inputs.length >= 2){
                setFormCompleted(true);
            }
            else{
                alert('add atleast two options');
            }
        } else {
          setFormCompleted(false);
        }
      }, [question, inputs, tags]);

    return(
        <div>
            <Heading />
            <div class="container">
            <section class="cointainer-pg4">
            <h1 id="qsn">Question</h1>
            <div className="input-container">
            <input id="question-tag-input"  type="text" placeholder="Type your poll question here" value={question} onChange={(e)=> setQuestion(e.target.value)}/>
            </div>
            <h1>Answer options</h1>
            {/* <div class="options" >
                <input type="tel"placeholder="Option 1" />  
            </div>
            <div class="options">
                <input type="tel"placeholder="Option 2" />
            </div> */}
            {inputs.map((input,index) => (
                <div key={index} className="options"> 
                    <div className="input-container" >
                        <input 
                        type="text" 
                        placeholder={`Option ${index +1}` }
                        value={input}
                        onChange={(e) => handleOptionChange(index, e.target.value)}/>
        <button onClick={() => deleteInput(index)} className="delete-btn"><FaTimes/></button> 
       </div> 
                </div>
            ))}
            <button class="btn-normal" id="btn-normal-pg4"  onClick={addInput}>Add option</button>
            <h1>comma separated tags</h1>
            <div className="input-container">
            <input type="tel" id="question-tag-input" placeholder="tag1,tag2" value={tags} onChange={(e) => setTags(e.target.value)}/><br /><br />
            </div>
            <br/>
            <button class="button" id="btn-pg4" 
                onClick={handleCreatpoll}>
                Create Poll
                </button> 
            </section>
             
                </div>
        </div>
    );
}

export default Createpoll;




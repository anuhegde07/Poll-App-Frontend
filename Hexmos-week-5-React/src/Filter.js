import React from "react";
// import { createContext } from "react";


function Filter(){

    // const FilterContext=createContext();

    // const handleCheckboxChange =(e) =>{
    //     const {checked ,value}=e.target;
    //     setSelectedTags(prevTags =>{
    //       if(checked){
    //         return[...prevTags,value];
    //       }
    //       else{
    //         return prevTags.filter(tag => tag!==value);
    //       }
    //     });
    //   };
  
    //   const handleFilterClick =() =>{
    //     if(selectedTags.length >0){
    //       setFilterByTags(true);
    //       const queryParams=selectedTags.join(',');
    //       navigate({
    //         pathname:'/',
    //         search: `?tags=${queryParams}`,
    //       });
    //     };
    //   }
    return(
        <button class="btn-normal" >Filter </button>
    );

}
export default Filter;
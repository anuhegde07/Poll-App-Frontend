import React from "react";
import Heading from "./Heading";
import Sidebar from "./Sidebar";
import Maincontent from "./MainContent";

import { useState } from "react";
import  SelectedTagsContext from "./SelectedTagsContext";

function Home(){
    
    const [selectedTags,setSelectedTags]=useState([]);

    const [filterByTags, setFilterByTags] = useState(false);
    const [getAllPolls, setGetAllPolls] = useState(false);
    

    const tags={
        Tags:selectedTags,
        updateTags:setSelectedTags,
        filterByTags:filterByTags,
        updateFilterByTags:setFilterByTags,
        getAllPolls:getAllPolls,
        updateGetAllPolls:setGetAllPolls,
    };
    
    return(
        <div>
            <Heading />
            <SelectedTagsContext.Provider value={tags}>
                <div className="parent-container">
                    <Sidebar />
                    <Maincontent />
                </div>
            </SelectedTagsContext.Provider>
            
        </div>
    );
}

export default Home;
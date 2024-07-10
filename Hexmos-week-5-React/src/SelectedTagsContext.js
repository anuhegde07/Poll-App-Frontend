// SelectedTagsContext.js

// import Home from './Home';
// import Sidebar from './Sidebar';
// import PollTable from './PollTable';



// export const SelectedTagsProvider = () => {
//     const [selectedTags, setSelectedTags] = useState([]);
  
//     return (
//       <SelectedTagsContext.Provider value={{ selectedTags, setSelectedTags }}>
//         <Home />
//         <Sidebar />
//         <PollTable />
//       </SelectedTagsContext.Provider>
//     );
//   };
  
import React, { createContext } from 'react';

const SelectedTagsContext = createContext();

export default SelectedTagsContext;

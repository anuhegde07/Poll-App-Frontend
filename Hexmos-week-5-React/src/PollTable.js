import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import SelectedTagsContext from './SelectedTagsContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function TablePaginationActions(props){
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  return (
    <>
    <IconButton
    onClick={handleBackButtonClick}
    disabled={page === 0}
    aria-label="previous page"
  >
  <KeyboardArrowLeft />
  </IconButton>
  <IconButton
    onClick={handleNextButtonClick}
    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
    aria-label="next page"
  >
  <KeyboardArrowRight />
      </IconButton>
      </>
);
}

function PollTable() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate=useNavigate();
  const {Tags,filterByTags,updateFilterByTags,getAllPolls,updateGetAllPolls} = useContext(SelectedTagsContext);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/polls/get_polls/')
      .then(response => {
        if(!response.ok){
          throw new Error('Failed to fetch polls');
        }
        return response.json();
      })

      .then(data => setPolls(data))
      .catch(error => {
        setError(error.message);
        console.error('Error fetching polls:', error);
      });
  }, [getAllPolls]);

  
  
  useEffect(() => {
    if(filterByTags){
        fetch(`http://127.0.0.1:8000/polls/get_polls_by_tags/?tags=${Tags}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch polls');
          }
          return response.json();
        })
        .then(data => setPolls(data))
        .catch(error => {
          setError(error.message);
          console.error('Error fetching polls:', error);
        });
      }
      updateGetAllPolls(false);
      updateFilterByTags(false);
  }, [ Tags,filterByTags,updateFilterByTags]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer component={Paper} id="pg1table">
      <Table class="table">
        <TableHead>
          <TableRow class="first-row">
            <TableCell>Number</TableCell>
            <TableCell> Poll Question</TableCell>
            <TableCell> Total votes</TableCell>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? polls.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : polls
          ).map((poll,index)=> (
            <TableRow key={poll.Question_ID}>
              <TableCell>{index+1}</TableCell>
              <TableCell class="Question" onClick={ () => navigate({
                  pathname: '/PollDetail',
                  search: `?id=${poll.Question_ID}`,
              })}>{poll.Question}</TableCell>
              <TableCell>{Object.values(poll.OptionVote).reduce((acc, curr) => acc + parseInt(curr), 0)}</TableCell>
              <TableCell>{poll.Tags.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
              rowsPerPageOptions={[5, 10 ,{ label: 'All', value: -1 }]}
              colSpan={4}
              count={polls.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
      </Table>
      </TableContainer>
      
  );
};
 

export default PollTable;






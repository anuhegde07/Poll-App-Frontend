import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Import useParams
import Heading from './Heading';
import { Table, TableBody, TableCell,TableHead, TableRow, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// import {Pie} from 'react-chartjs-2'
import { Piechart } from './Piechart';

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return(
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
function PollDetail() {
 const [poll, setPolls] = useState([]);
 const [error, setError] = useState(null);
 const [searchParams]=useSearchParams();
 const [rowsPerPage, setRowsPerPage] = useState(5);
 const [page, setPage] = useState(0);
 const idString=searchParams.get('id');
 const poll_id=Number(idString);
 const navigate=useNavigate();

//  for piechart
// const [chartData,setChartData]=useState(null)

 useEffect(() => {
    fetch(`http://127.0.0.1:8000/polls/${poll_id}/get_polls_by_id/`)
      .then(response => response.json())
      .then(data => setPolls(data))
      .catch(error => {
        setError(error.message);
        console.error('Error fetching polls:', error);
      });
 }, [poll_id]);

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

 // Ensure poll has the expected structure before rendering
 if (!poll.Question || !poll.OptionVote || !poll.Tags) {
    return <div>Loading...</div>
 }
 const options={
  data:[
    ["Options","Votes"],
    ...Object.entries(poll.OptionVote)
  ],
  title:{
    title:"Poll votes"
  }
 };

 const Votes=Object.values(poll.OptionVote).reduce((acc, curr) => acc + parseInt(curr), 0)
 return (
  <div>
    <Heading/>
    <h1 className="heading">{poll.Question}</h1>
    <button class="btn-normal" id="btn-pg2" onClick={ () => navigate({
        pathname:'/Vote',
        search: `?id=${poll.Question_ID}`,
      })}>Vote on this poll</button>
    <div className="table" id="pg2table">
      <div className='tables'>
      <Table className="table" align="right">
        <TableHead>
          <TableRow className="first-row">
            <th>Number</th>
            <th>Option</th>
            <th>Votes</th>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.entries(poll.OptionVote).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(([option, votes], index) => (
            <TableRow key={option}>
               <TableCell>{index + 1}</TableCell>
              <TableCell>{option}</TableCell>
              <TableCell>{votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TablePagination
              rowsPerPageOptions={[3 ,5 ,7 ,{ label: 'All', value:-1 }]}
              colSpan={3}
              count={Object.keys(poll.OptionVote).length}
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
      <p className="para">Tags: {poll.Tags.join(', ')}</p>
      </div>
    {Votes > 0 &&
      <Piechart option={options}/>
    }
  </div>
  </div>
 );
}
export default PollDetail;

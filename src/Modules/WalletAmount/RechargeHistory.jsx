import React, { useEffect, useState } from 'react'
import PaginatedTable from '../../components/PaginatedTable/PaginatedTable'
import HeaderComponent from '../../components/Header/HeaderComponent';

const RechargeHistory = () => {
const [gameRecord, setGameRecord] = useState([]);

useEffect(()=>{
fetchRecord();
},[])

    const fetchRecord = () => {
        fetch('http://localhost:8000/recharge_history.php')
      .then(response => response.json())
      .then(data => {
        setGameRecord(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors
      });
    
      };


      const columns = [
        { Header: 'Period', accessor: 'timestamp' },
        { Header: 'Date', accessor: 'created_at' },
        { Header: 'Transaction Type', accessor: 'transaction_type' },
        { Header: 'Amount', accessor: 'amount' },
      
      ];

  return (
    <>
      <HeaderComponent label={"Recharge History"} />
    
    <div className="container-fluid px-lg-5 px-3 mt-5">
        <div className="row">
          <div className="col-lg-12">
          <PaginatedTable data={gameRecord} columns={columns} />
          </div>
        </div>
      </div>
      </>
  )
}

export default RechargeHistory
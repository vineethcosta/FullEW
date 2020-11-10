import React, { useState , useEffect, forwardRef} from 'react';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Search from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList';
import MaterialTable from 'material-table';
import Clear from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import {
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';


const tableIcons = 
{FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />)}

const LatestOrders = ({ className, ...rest }) => {

  const [inwardData, setInwardData] = useState([]);
  const [outwardData, setOutwardData] = useState([]);

  useEffect( ()=>{
    fetch('http://localhost:5000/getInward',{
    }).then(res=>res.json())
    .then(result=>{
        setInwardData(result.inward)
    });  
  },[null])

  useEffect( ()=>{
    fetch('http://localhost:5000/getOutward',{
    }).then(res=>res.json())
    .then(result=>{
        setOutwardData(inwardData.concat(result.outward))
    });  
  },[null])

  var columns_array = [];
  if(inwardData.length > 0 || outwardData.length > 0){
    columns_array = []
    for(var i=0;i<outwardData.length;i++){
      inwardData.push(outwardData[i])
    }
    console.log("inwarddata = ",inwardData)
    var keys1, keys2;
    if(inwardData.length>0){
       keys1 = Object.keys(inwardData[0])
    }
    if(outwardData.length>0){
      keys2 = Object.keys(outwardData[0])
    }
    
    for(var i in keys2)
    {
      
      if(keys1.includes(keys2[i]))
      {
          continue
      }
      else{
        keys1.push(keys2[i])
      }
      
    }
    console.log("check"+keys1)
    keys1.map(x => {columns_array.push({"title" : x , field : x})})
  }




  return (
    <div className = "dashBoard" >
        <hr/>
      <MaterialTable
        title="Inward/Outward"
        columns = {columns_array}
        data={inwardData.map(item => Object.assign({}, item))} 
        icons = {tableIcons}       
        options={{
          filtering: true,
          sorting: true,
          pageSize: 5,
          paginationType: "stepped",
          rowStyle: rowData => {
            if (rowData.type === 'Inward') {
              return { backgroundColor: '#ddfada ' };
            } else if (rowData.type === 'Outward') {
              return { backgroundColor: '#ffe2e2' };
            }
          }
        }}
       
      />
      </div>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;

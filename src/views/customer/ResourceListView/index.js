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
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />)}

const ResourceListView = ({ className, ...rest }) => {

  const [allResources, setAllResources] = useState([]);
  const [columns_array, setColsArray] = useState([]);
    useEffect(()=>{
      fetch('http://localhost:5000/getFullResources',{
      }).then(res=>res.json())
      .then(result=>{
          console.log("result = " , result);
          var cols = Object.keys(result.resources[0])
          cols.map(x => {columns_array.push({title : x , "field" : x})})
          console.log(columns_array)
          setAllResources(result.resources)
      })
    },[])
  return (
    <div className = "dashBoard" >
        <hr/>
      <MaterialTable
        title="Resources"
        columns={columns_array}
        data={allResources.map(item => Object.assign({}, item))} 
        icons = {tableIcons}   
        options={{
          filtering: true,
          sorting: true,
          pageSize: 5,
          paginationType: "stepped",
        }}
        
      />
      </div>
  );
};

ResourceListView.propTypes = {
  className: PropTypes.string
};

export default ResourceListView;

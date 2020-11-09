import React, { useState , useEffect} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const ResourceListView = () => {
  const classes = useStyles();
  const [allResources, setAllResources] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/getFullResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result.resources)
    })
  },[])

  
  return (
    <Page
      className={classes.root}
      title="Resources"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results resources={allResources} />
        </Box>
      </Container>
    </Page>
  );
};

export default ResourceListView;

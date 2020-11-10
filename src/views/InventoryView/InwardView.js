import React,{useState, useEffect} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as initialData from '../../components/initialData'
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Link,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const InwardView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
//   const resources = [
//     { 'value': 'dummy1', 'label': 'DUMMY1' },
//     { 'value': 'dummy2', 'label': 'DUMMY2' },
// ];
//     const people = [
//     { 'value': 'dummy1', 'label': 'DUMMY1' },
//     { 'value': 'dummy2', 'label': 'DUMMY2' },
// ];
  const [allResources, setAllResources] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/getAllResources',{
    }).then(res=>res.json())
    .then(result=>{
        setAllResources(result.resources)
    })
  },[])
  console.log("resurces", allResources);
  useEffect(()=>{
    fetch('http://localhost:5000/getAllPersons',{
    }).then(res=>res.json())
    .then(result=>{
        setAllPersons(result.persons);
    })
  },[])
  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              resource: '',
              sourcedBy: '',
              quantity: '',
              price: '',
              date: '',
              billNo: '',
              comments: ''
            }}
            validationSchema={
              Yup.object().shape({
                resource: Yup.string().max(255).required('Resource is required'),
                sourcedBy: Yup.string().max(255).required('Sourced By is required'),
                quantity: Yup.string().max(255).required('Quantity is required'),
                price: Yup.string().max(255).required('Price is required'),
                date: Yup.string().max(255).required('Date is required'),
                comments: Yup.string().max(255).required('Comments are required'),
                billNo: Yup.string().max(255).required('bill Number are required')
               
              })
            }
            onSubmit = {(values, {setSubmitting, resetForm}) => {
              setTimeout(() => {
                fetch('http://localhost:5000/addInward', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({values})
                })
                .then((res) => {
                  if(res.ok){
                    alert("Inward Successfully Added");
                  }else{
                    alert("There was an errror");
                  }
                  
                  setSubmitting(false);
                  resetForm({})
                })
                .catch(() => alert("There was a error, Please try again"))
              }, 1000);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                {/* <Box mb={1}> */}
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    INWARD
                  </Typography>
                  <Grid
                  container
                  spacing={3}
                >
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                  <Box my={2}>
                  <RouterLink to = "/app/addResource">
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                    >
                      ADD RESOURCE
                    </Button>
                  </RouterLink>
                </Box>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                <Box my={2}>
                <RouterLink to = "/app/addPerson">
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      variant="contained"
                    >
                      ADD PERSON
                    </Button>
                  </RouterLink>
                </Box>
                </Grid>
                </Grid>


                  <Grid
                  container
                  spacing={3}
                >
                <Grid
                    item
                    md={4}
                    xs={12}
                  >
               <TextField
                      error={Boolean(touched.quantity && errors.quantity)}
                      fullWidth
                      helperText={touched.quantity && errors.quantity}
                      label="Quantity"
                      margin="normal"
                      name="quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.quantity}
                      variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                  >
                <TextField
                      error={Boolean(touched.price && errors.price)}
                      fullWidth
                      helperText={touched.price && errors.price}
                      label="Price"
                      margin="normal"
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      variant="outlined"
                    />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                  >
                <TextField
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText={touched.date && errors.date}
                      type = "date"
                      margin="normal"
                      name="date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.date}
                      variant="outlined"
                    />
                </Grid>
                </Grid>
                <TextField
                  error={Boolean(touched.price && errors.price)}
                  fullWidth
                  helperText={touched.price && errors.price}
                  label="Bill No"
                  margin="normal"
                  name="billNo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.billNo}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  name="sourcedBy"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.sourcedBy}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "Sourced By"/>
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name}
                      value={option.first_name}
                    >
                      {option.first_name}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="resource"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.resource}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "select resource"/>
                  {allResources.map((option) => (
                    <option
                      key={option.identifier}
                      value={option.identifier}
                    >
                      {option.identifier}
                    </option>
                  ))}
                </TextField>
                <TextField
                      multiline
                      error={Boolean(touched.comments && errors.comments)}
                      fullWidth
                      rows = {3}
                      helperText={touched.comments && errors.comments}
                      label="comments"
                      margin="normal"
                      name="comments"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.comments}
                      variant="outlined"
                    />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    SAVE
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default InwardView;

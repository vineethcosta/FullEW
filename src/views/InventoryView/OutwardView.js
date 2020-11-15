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

const OutwardView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [allResources, setAllResources] = useState([]);
  const [allPersons, setAllPersons] = useState([]);
  useEffect(()=>{
  fetch('http://localhost:5000/getAllResources',{
  }).then(res=>res.json())
  .then(result=>{
      setAllResources(result.resources)
  })
  },[]);
  useEffect(()=>{
  fetch('http://localhost:5000/getAllPersons',{
  }).then(res=>res.json())
  .then(result=>{
      setAllPersons(result.persons)
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
              requestedBy: '',
              transportedBy: '',
              contractor: '',
              quantity: '',
              toLocation: '',
              comments: '',
              date: '',
              vehicleNo: ''
            }}
            validationSchema={
              Yup.object().shape({
                resource: Yup.string().max(255).required('Resource is required'),
                requestedBy: Yup.string().max(255).required('Requested By is required'),
                transportedBy: Yup.string().max(255).required('Transported By is required'),
                quantity: Yup.string().max(255).required('Quantity is required'),
                toLocation: Yup.string().max(255).required('Location is required'),
                date: Yup.string().max(255).required('Date is required'),
                comments: Yup.string().max(255).required('Comments are required'),
                contractor: Yup.string().max(255).required('Contractor are required'),
                vehicleNo: Yup.string().max(255).required('vehicle no are required')
              })
            }
            onSubmit = {(values, {setSubmitting, resetForm}) => {
              console.log("values = ", values);
              setTimeout(() => {
                fetch('http://localhost:5000/addOutward', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({values})
                })
                .then((res) => {
                  if(res.ok){
                    alert("Outward Successfully Added");
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
                    OUTWARD
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
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    ADD RESOURCE
                  </Button>
                </Box>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                  >
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    ADD PERSON
                  </Button>
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
                      type = "number"
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
                      error={Boolean(touched.toLocation && errors.toLocation)}
                      fullWidth
                      helperText={touched.toLocation && errors.toLocation}
                      label="To Location"
                      margin="normal"
                      name="toLocation"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.toLocation}
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
                      error={Boolean(touched.date && errors.date)}
                      fullWidth
                      helperText={touched.date && errors.date}
                      margin="normal"
                      label="vehicle number"
                      name="vehicleNo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.vehicleNo}
                      variant="outlined"
                    />
                <TextField
                  fullWidth
                  name="requestedBy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.requestedBy}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "requested by"/>
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name + "-" + option.last_name}
                      value={option.first_name + "-" + option.last_name}
                    >
                      {option.first_name + "-" + option.last_name}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="transportedBy"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.transportedBy}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "transported by"/>
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name + "-" + option.last_name}
                      value={option.first_name + "-" + option.last_name}
                    >
                      {option.first_name + "-" + option.last_name}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  name="contractor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.contractor}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "contractor"/>
                  {allPersons.map((option) => (
                    <option
                      key={option.first_name + "-" + option.last_name}
                      value={option.first_name + "-" + option.last_name}
                    >
                      {option.first_name + "-" + option.last_name}
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
                      rows = {3}
                      error={Boolean(touched.comments && errors.comments)}
                      fullWidth
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

export default OutwardView;

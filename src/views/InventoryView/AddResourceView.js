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

const AddResourceView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const types = initialData.types
  const units = initialData.units
  const [allOwners, setAllOwners] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/getAllPersons',{
    }).then(res=>res.json())
    .then(result=>{
      var x = []
        for(var i in result.persons){
            x.push({"label": result.persons[i].first_name +" " + result.persons[i].last_name})
        }
        setAllOwners(x)
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
              fullName: '',
              nickName: '',
              type: '',
              SKU: '',
              quantity: '',
              units: '',
              location: '',
              owner:''
            }}
            validationSchema={
              Yup.object().shape({
                fullName: Yup.string().max(255).required('Full name is required'),
                nickName: Yup.string().max(255).required('Nick name is required'),
                type: Yup.string().max(255).required('Type is required'),
                SKU: Yup.string().max(255).required('SKU is required'),
                quantity: Yup.string().max(255).required('Quantity is required'),
                units: Yup.string().max(255).required('Units is required'),
                location: Yup.string().max(255).required('Location is required'),
                owner: Yup.string().max(255).required('Owner is required')
              })
            }
            onSubmit = {(values, {setSubmitting, resetForm}) => {
              setTimeout(() => {
                fetch('http://localhost:5000/addResource', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({values})
                })
                .then(() => {
                  alert("Resource Successfully Added");
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
              handleReset,
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
                    ADD RESOURCE
                  </Typography>
                  <Grid
                  container
                  spacing={3}
                >
                <Grid
                    item
                    md={8}
                    xs={12}
                  >
              
                <TextField
                  fullWidth
                  name="owner"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.owner}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "select Owner"/>
                  {allOwners.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                </Grid>
                <Grid
                    item
                    md={4}
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
                      Add Person
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
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.fullName && errors.fullName)}
                      fullWidth
                      helperText={touched.fullName && errors.fullName}
                      label="Full name"
                      margin="normal"
                      name="fullName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.nickName && errors.nickName)}
                      fullWidth
                      helperText={touched.nickName && errors.nickName}
                      label="Nick name"
                      margin="normal"
                      name="nickName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nickName}
                      variant="outlined"
                    />
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
                      error={Boolean(touched.SKU && errors.SKU)}
                      fullWidth
                      helperText={touched.SKU && errors.SKU}
                      label="SKU"
                      margin="normal"
                      name="SKU"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.SKU}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.quanitiy && errors.quanitiy)}
                      fullWidth
                      helperText={touched.quanitiy && errors.quanitiy}
                      label="Quantity"
                      name="quantity"
                      margin="normal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.quanitiy}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                  <TextField
                  fullWidth
                  name="units"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.units}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "select units"/>
                  {units.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                </Grid>
                </Grid>
                <TextField
                  error={Boolean(touched.location && errors.location)}
                  fullWidth
                  helperText={touched.location && errors.location}
                  label="Location"
                  margin="normal"
                  name="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  name="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.type}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "select type"/>
                  {types.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
               
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
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

export default AddResourceView;

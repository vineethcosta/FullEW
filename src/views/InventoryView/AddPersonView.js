import React from 'react';
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
  makeStyles,
  Select
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

const AddPersonView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const jobtitles = initialData.jobtitles;
  const organizations = initialData.organizations;
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
              email: '',
              firstName: '',
              lastName: '',
              location: '',
              phone: '',
              address: '',
              organization: '',
              jobTitle: ''
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                location: Yup.string().max(255).required('Location is required'),
                phone: Yup.string().max(255).required('Phone Number is required'),
                address: Yup.string().max(255).required('Address is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked'),
                organization: Yup.string().max(255).required('Organization is required'),
                jobTitle: Yup.string().max(255).required('Address is required'),
              })
            }
            onSubmit = {(values, {setSubmitting, resetForm}) => {
              setTimeout(() => {
                fetch('http://localhost:5000/addPerson', {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({values})
                })
                .then(() => {
                  alert("Person Successfully Added");
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
                    ADD PERSON
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
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      label="First name"
                      margin="normal"
                      name="firstName"
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
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      label="Last name"
                      margin="normal"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
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
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.phone && errors.phone)}
                      fullWidth
                      helperText={touched.phone && errors.phone}
                      label="Phone Number"
                      name="phone"
                      margin="normal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.phone}
                      variant="outlined"
                    />
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
                  name="jobTitle"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.jobTitle}
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "select jobtitle"/>
                  {jobtitles.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                    
                
                <TextField
                  fullWidth
                  // label="Select Organization"
                  name="organization"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  select
                  SelectProps={{ native: true}}
                  
                  variant="outlined"
                  margin = "normal"
                >
                  <option  value= "" label = "select organization"/>
                  {organizations.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <TextField
                  multiline
                  rows = {3}
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Address"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  variant="outlined"
                />
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
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

export default AddPersonView;

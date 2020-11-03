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
  const owners = [
    { 'value': 'dummy1', 'label': 'DUMMY1' },
    { 'value': 'dummy2', 'label': 'DUMMY2' },
];
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
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
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
                  label="Select Owner"
                  name="owner"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.type}
                  variant="outlined"
                  margin = "normal"
                >
                  {owners.map((option) => (
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
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Person
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
                  label="Units"
                  name="units"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.type}
                  variant="outlined"
                  margin = "normal"
                >
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
                  label="Select Type"
                  name="type"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.type}
                  variant="outlined"
                  margin = "normal"
                >
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

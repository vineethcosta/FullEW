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

const OutwardView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const resources = [
    { 'value': 'dummy1', 'label': 'DUMMY1' },
    { 'value': 'dummy2', 'label': 'DUMMY2' },
];
    const people = [
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
              resource: '',
              requestedBy: '',
              transportedBy: '',
              quantity: '',
              toLocation: '',
              comments: '',
              date: ''
            }}
            validationSchema={
              Yup.object().shape({
                resource: Yup.string().max(255).required('Resource is required'),
                requestedBy: Yup.string().max(255).required('Requested By is required'),
                transportedBy: Yup.string().max(255).required('Transported By is required'),
                quantity: Yup.string().max(255).required('Quantity is required'),
                toLocation: Yup.string().max(255).required('Location is required'),
                date: Yup.string().max(255).required('Date is required'),
                comments: Yup.string().max(255).required('Comments are required')
               
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
                  fullWidth
                  label="Requested By"
                  name="requestedBy"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.requestedBy}
                  variant="outlined"
                  margin = "normal"
                >
                  {people.map((option) => (
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
                  label="Transported By"
                  name="transportedBy"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.transportedBy}
                  variant="outlined"
                  margin = "normal"
                >
                  {people.map((option) => (
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
                  label="Resource"
                  name="resource"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true}}
                  value={values.type}
                  variant="outlined"
                  margin = "normal"
                >
                  {resources.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                      error={Boolean(touched.comments && errors.comments)}
                      fullWidth
                      helperText={touched.comments && errors.comments}
                      label="comments"
                      margin="normal"
                      name="Comments"
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

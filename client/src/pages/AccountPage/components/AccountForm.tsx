import React, { FC } from "react";
import { Formik, Form, FormikHelpers } from "formik";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { accountSchema } from "utils";
import { Account } from "types/account.type";

interface AccountFormProps {
  formData: Account;
  handleSubmit: (
    values: Account,
    formikHelpers: FormikHelpers<Account>
  ) => void;
}

const AccountForm: FC<AccountFormProps> = ({ formData, handleSubmit }) => {
  return (
    <Formik
      validateOnBlur
      validateOnChange
      enableReinitialize
      onSubmit={handleSubmit}
      initialValues={formData}
      validationSchema={accountSchema}
    >
      {(formik) => (
        <Form>
          <FormControl fullWidth>
            <InputLabel id="account-type">Account Type</InputLabel>
            <Select
              id="accountType"
              name="accountType"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.accountType}
              error={
                formik.touched.accountType && Boolean(formik.errors.accountType)
              }
            >
              <MenuItem value="manual">Manual</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            margin="normal"
            label="User Name"
            inputProps={{
              form: {
                autoComplete: "off",
              },
            }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            margin="normal"
            id="serverAddress"
            name="serverAddress"
            label="Server Address"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.serverAddress}
            error={
              formik.touched.serverAddress &&
              Boolean(formik.errors.serverAddress)
            }
            helperText={
              formik.touched.serverAddress && formik.errors.serverAddress
            }
          />

          {formik.values.accountType === "advanced" && (
            <>
              <TextField
                fullWidth
                margin="normal"
                id="serverPath"
                name="serverPath"
                label="Server Path"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.serverPath}
                error={
                  formik.touched.serverPath && Boolean(formik.errors.serverPath)
                }
                helperText={
                  formik.touched.serverPath && formik.errors.serverPath
                }
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="serverPort"
                    label="Server Port"
                    id="serverPort"
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 65535,
                    }}
                    sx={{ width: 150 }}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.serverPort}
                    error={
                      formik.touched.serverPort &&
                      Boolean(formik.errors.serverPort)
                    }
                    helperText={
                      formik.touched.serverPort && formik.errors.serverPort
                    }
                  />
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="useSSL"
                        name="useSSL"
                        color="primary"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        checked={formik.values.useSSL}
                      />
                    }
                    label="Use SSL"
                  />
                </Box>
              </Box>
            </>
          )}

          <Button
            sx={{ mt: 2 }}
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AccountForm;

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { FormikHelpers } from "formik";

import { initialValues } from "utils";
import { Account } from "types/account.type";

import AccountForm from "./components/AccountForm";

const { REACT_APP_API_URL } = process.env;

const AccountPage = () => {
  const [account, setAccount] = useState<Account | null>(null);

  const handleSubmit = async (
    values: Account,
    formikHelpers: FormikHelpers<Account>
  ) => {
    const { setSubmitting } = formikHelpers;

    alert(JSON.stringify(values, null, 2));

    try {
      if (!!account) {
        await axios.patch<{ data: Account }>(
          `${REACT_APP_API_URL}/api/account`,
          values
        );
      } else {
        await axios.post<{ data: Account }>(
          `${REACT_APP_API_URL}/api/account`,
          values
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchAccount = useCallback(async () => {
    try {
      const { data } = await axios.get<{ account: Account }>(
        `${REACT_APP_API_URL}/api/account`
      );

      if (data.account && !account) {
        setAccount(data.account);
      }
    } catch (error) {
      console.error(error);
    }
  }, [account]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <Box>
      <h4>Alexandru Patrascu - FS - home test - Blix</h4>
      <AccountForm
        formData={account || initialValues}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default AccountPage;

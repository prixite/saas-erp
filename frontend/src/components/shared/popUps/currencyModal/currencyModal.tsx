import { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import {
  CurrencyInterface,
  LocalizationInterface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiCurrencyCreateMutation,
  useApiCurrencyUpdateMutation,
  useApiCurrencyRetrieveQuery,
} from "@src/store/api";
import "@src/components/shared/popUps/currencyModal/currencyModal.scss";

interface Props {
  currencyId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const CurrencyModal = ({ currencyId, action, open, handleClose }: Props) => {
  const [createCurrency] = useApiCurrencyCreateMutation();
  const [updateCurrency] = useApiCurrencyUpdateMutation();
  const { data: currencyData } = useApiCurrencyRetrieveQuery(
    {
      id: Number(currencyId || ""),
    },
    { skip: !currencyId }
  );

  const [loading, setLoading] = useState(false);

  const populateEditableData = (
    currencyData: CurrencyInterface | undefined
  ) => {
    formik.setValues({
      code: currencyData?.code as string,
      symbol: currencyData?.symbol as string,
    });
  };
  const formik = useFormik({
    initialValues: {
      code: "",
      symbol: "",
    },
    validationSchema: yup.object({
      code: yup.string().required("Code is required"),
      symbol: yup.string().required("Symbol is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleurrencnyEdit();
      } else {
        handleCurrencyCreate();
      }
    },
  });
  const handleCurrencyCreate = async () => {
    setLoading(true);
    await createCurrency({
      currency: {
        code: formik.values.code,
        symbol: formik.values.symbol,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Currency created successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const handleurrencnyEdit = async () => {
    setLoading(true);
    await updateCurrency({
      id: currencyId as number,
      currency: {
        code: formik.values.code,
        symbol: formik.values.symbol,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Currency updated successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(currencyData);
    }
  }, [action, currencyData, currencyId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="currencyModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a currency" : "Create a currency"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a currency"
                  : "Fill the following fields to add a currency"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="currencyModal__Content">
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <Box className="fields-cls">
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Code"}
                value={formik.values.code}
                name="code"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.code && formik.errors.code}
              </Typography>
            </Box>
          </Box>
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <Box className="fields-cls">
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Symbol"}
                value={formik.values.symbol}
                name="symbol"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.symbol && formik.errors.symbol}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="currencyModal__Actions">
          <Button className="resetBtn" onClick={resetModal}>
            {"Cancel"}
          </Button>
          <LoadingButton
            className="submitBtn"
            loading={loading}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            {!loading && (
              <span style={{ display: "flex" }}>
                {"Save"}
                <span>
                  {" "}
                  <img className="submit-img" src={submitIcon} alt="submit" />
                </span>{" "}
              </span>
            )}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CurrencyModal;

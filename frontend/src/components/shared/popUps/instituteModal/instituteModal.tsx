import { useState, useEffect, useRef } from "react";
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
import UploadIcon from "@src/assets/svgs/uploadimg.svg";
import PreviewImage from "@src/components/common/presentational/previewImage/previewImage";
import { timeOut } from "@src/helpers/constants/constants";
import {
  InstitueInterface,
  LocalizationInterface,
  S3Interface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { uploadImageToS3 } from "@src/helpers/utils/uploadImage";
import { toastAPIError } from "@src/helpers/utils/utils";
import {
  useApiInstituesCreateMutation,
  useApiInstituesUpdateMutation,
  useApiInstituesRetrieveQuery,
} from "@src/store/api";
import "@src/components/shared/popUps/instituteModal/instituteModal.scss";

interface Props {
  institueId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const InstituteModal = ({ institueId, action, open, handleClose }: Props) => {
  const [createInstitue] = useApiInstituesCreateMutation();
  const [updateInstitue] = useApiInstituesUpdateMutation();
  const { data: institueData } = useApiInstituesRetrieveQuery(
    {
      id: Number(institueId || ""),
    },
    { skip: !institueId }
  );

  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const constantData: LocalizationInterface = localizedData();

  const { uploadImg, removeImg } = constantData.Modals;

  const populateEditableData = (
    institueData: InstitueInterface | undefined
  ) => {
    formik.setValues({
      name: institueData?.name as string,
      image: institueData?.image as string,
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      image: yup.string().required("Image is required"),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleInstitueEdit();
      } else {
        handleInstitureCreate();
      }
    },
  });
  const handleInstitureCreate = async () => {
    setLoading(true);
    await uploadImageToS3(formik.values.image || "")
      .then(async (data: S3Interface) => {
        await createInstitue({
          institue: {
            name: formik.values.name,
            image: data.location,
          },
        })
          .unwrap()
          .then(async () => {
            toast.success("Institute created successfully.", {
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
      })
      .catch((error) => {
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  const handleInstitueEdit = async () => {
    setLoading(true);
    if (formik.values.image?.length) {
      performInstitueEdit(formik.values.image);
    } else {
      await uploadImageToS3(formik.values.image || "")
        .then(async (data: S3Interface) => {
          performInstitueEdit(data.location);
        })
        .catch((error) => {
          toastAPIError("Something went wrong.", error.status, error.data);
        });
    }
  };

  const performInstitueEdit = async (imageUrl: string) => {
    setLoading(true);
    await updateInstitue({
      id: institueId as number,
      institue: {
        name: formik.values.name,
        image: imageUrl,
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("Institute updated successfully.", {
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
      populateEditableData(institueData);
    }
  }, [action, institueData, institueId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="instituteModal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update an institue" : "Create an institue"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update an institue"
                  : "Fill the following fields to add an institue"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="instituteModal__Content">
          <Box className="user-profile-img">
            <Box className="upload-img">
              <input
                ref={fileRef}
                hidden
                type="file"
                onChange={(e) => {
                  formik.setFieldValue(
                    "image",
                    (e.target as HTMLInputElement)?.files?.[0]
                  );
                }}
              />
              {action === "edit" &&
              !fileRef.current?.value &&
              formik.values.image &&
              typeof formik.values.image === "string" ? (
                <img
                  className="preview-img"
                  src={formik.values.image}
                  alt="upload icon"
                />
              ) : formik.values.image ? (
                <PreviewImage file={formik.values.image} />
              ) : (
                <img
                  className="upload-pic"
                  src={UploadIcon}
                  alt="upload icon"
                />
              )}
            </Box>

            <Box className="upload-btn">
              <Button
                onClick={() => {
                  fileRef?.current?.click();
                }}
                className="upload-img-btn"
                sx={{ ml: "20px !important" }}
              >
                {uploadImg}
              </Button>
            </Box>
            {formik.values.image ? (
              <Box className="remove-btn-section">
                <Button
                  onClick={() => {
                    formik.setFieldValue("image", "");
                  }}
                  className="remove-btn"
                  sx={{ ml: "11px !important" }}
                >
                  {removeImg}
                </Button>
              </Box>
            ) : (
              ""
            )}
          </Box>
          <Typography sx={{ color: "#ff1744", fontSize: "0.8rem" }}>
            {formik.touched.image && formik.errors.image}
          </Typography>
          <Box className="fields-cls" sx={{ height: "85px !important" }}>
            <Box className="fields-cls">
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Name"}
                value={formik.values.name}
                name="name"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.name && formik.errors.name}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="instituteModal__Actions">
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

export default InstituteModal;

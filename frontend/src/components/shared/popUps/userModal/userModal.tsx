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
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import crossIcon from "@src/assets/svgs/cross.svg";
import UploadIcon from "@src/assets/svgs/uploadimg.svg";
import submitIcon from "@src/assets/svgs/Frame.svg";
import { timeOut } from "@src/helpers/constants/constants";
import {
  LocalizationInterface,
  S3Interface,
  UserInterface,
} from "@src/helpers/interfaces/localizationinterfaces";
import {
  emailRegX,
  nameRegex,
  phoneRegex,
  toastAPIError,
} from "@src/helpers/utils/utils";
import {
  useApiUsersCreateMutation,
  useApiUsersUpdateMutation,
  useApiUsersRetrieveQuery,
  useApiRoleListQuery,
} from "@src/store/api";
import { localizedData } from "@src/helpers/utils/language";
import "@src/components/shared/popUps/userModal/userModal.scss";
import PreviewImage from "@src/components/common/presentational/previewImage/previewImage";
import { uploadImageToS3 } from "@src/helpers/utils/uploadImage";

interface Props {
  userId?: number;
  action?: string;
  open: boolean;
  handleClose: () => void;
}

const UserModal = ({ userId, action, open, handleClose }: Props) => {
  const [createUser] = useApiUsersCreateMutation();
  const [updateUser] = useApiUsersUpdateMutation();
  const { data: rolesData } = useApiRoleListQuery();
  const { data: userData } = useApiUsersRetrieveQuery(
    {
      id: Number(userId || ""),
    },
    { skip: !userId }
  );

  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const constantData: LocalizationInterface = localizedData();

  const {
    firstNameRequired,
    lastNameRequired,
    phoneRequired,
    emailRequired,
    DefaultRoleRequired,
    employeeImageError,
    emailrRegxError,
    firstNameRegxError,
    lastNameRegxError,
    uploadImg,
    removeImg,
    phoneRegxError,
  } = constantData.Modals;

  const populateEditableData = (userData: UserInterface | undefined) => {
    formik.setValues({
      first_name: userData?.first_name as string,
      last_name: userData?.last_name as string,
      email: userData?.email as string,
      contact_number: userData?.contact_number as string,
      default_role: String(userData?.default_role.id),
      image: userData?.image as string,
    });
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      image: "",
      contact_number: "",
      default_role: "",
    },
    validationSchema: yup.object({
      first_name: yup
        .string()
        .matches(nameRegex, firstNameRegxError)
        .required(firstNameRequired),
      last_name: yup
        .string()
        .matches(nameRegex, lastNameRegxError)
        .required(lastNameRequired),
      contact_number: yup
        .string()
        .matches(phoneRegex, phoneRegxError)
        .required(phoneRequired),
      email: yup
        .string()
        .matches(emailRegX, emailrRegxError)
        .required(emailRequired),
      default_role: yup.string().required(DefaultRoleRequired),
      image: yup.string().required(employeeImageError),
    }),
    validateOnChange: true,
    onSubmit: () => {
      if (action === "edit") {
        handleUserEdit();
      } else {
        handleUserCreate();
      }
    },
  });
  const handleUserCreate = async () => {
    setLoading(true);
    await uploadImageToS3(formik.values.image || "")
      .then(async (data: S3Interface) => {
        await createUser({
          user: {
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            email: formik.values.email,
            image: data.location,
            contact_number: formik.values.contact_number,
            default_role: Number(formik.values.default_role),
          },
        })
          .unwrap()
          .then(async () => {
            toast.success("User created successfully.", {
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

  const handleUserEdit = async () => {
    setLoading(true);
    if (formik.values.image?.length) {
      performEditUser(formik.values.image);
    } else {
      await uploadImageToS3(formik.values.image || "")
        .then(async (data: S3Interface) => {
          performEditUser(data.location);
        })
        .catch((error) => {
          toastAPIError("Something went wrong.", error.status, error.data);
        });
    }
  };

  const performEditUser = async (imageUrl: string) => {
    await updateUser({
      id: userId as number,
      user: {
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
        email: formik.values.email,
        image: imageUrl,
        contact_number: formik.values.contact_number,
        default_role: Number(formik.values.default_role),
      },
    })
      .unwrap()
      .then(async () => {
        toast.success("User updated successfully.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        resetModal();
        ``;
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };

  useEffect(() => {
    if (action === "edit") {
      populateEditableData(userData);
    }
  }, [action, userData, userId]);

  const resetModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={resetModal} className="userMdal">
        <DialogTitle>
          <Box className="modal-header-cls">
            <Box className="heading-text-box">
              <Typography className="heading-text">
                {action == "edit" ? "Update a user" : "Create a user"}
              </Typography>
              <Typography className="subheading-text">
                {action == "edit"
                  ? "Fill the following fields to update a user"
                  : "Fill the following fields to add a user"}
              </Typography>
            </Box>
            <Box className="cross-icon-box" onClick={resetModal}>
              <img src={crossIcon} className="cross-btn" />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="userMdal__Content">
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
                label={"First Name"}
                value={formik.values.first_name}
                name="first_name"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.first_name && formik.errors.first_name}
              </Typography>
            </Box>
            <Box className="fields-cls" sx={{ height: "85px !important" }}>
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Last Name"}
                value={formik.values.last_name}
                name="last_name"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.last_name && formik.errors.last_name}
              </Typography>
            </Box>
            <Box className="fields-cls" sx={{ height: "85px !important" }}>
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Email"}
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.email && formik.errors.email}
              </Typography>
            </Box>
            <Box className="fields-cls" sx={{ height: "85px !important" }}>
              <TextField
                margin="normal"
                className="text-field-cls"
                required
                fullWidth
                label={"Contact Number"}
                value={formik.values.contact_number}
                name="contact_number"
                onChange={formik.handleChange}
                InputLabelProps={{ className: "textfield_label" }}
              ></TextField>
              <Typography className="errorText">
                {formik.touched.contact_number && formik.errors.contact_number}
              </Typography>
            </Box>
            <Box className="fields-cls" sx={{ height: "85px !important" }}>
              <TextField
                margin="normal"
                className="text-field-cls"
                select
                required
                fullWidth
                name="default_role"
                label="Default Role"
                onChange={formik.handleChange}
                value={formik.values.default_role || ""}
                InputLabelProps={{ className: "textfield_label" }}
              >
                {rolesData?.length ? (
                  rolesData?.map((role) => {
                    return (
                      <MenuItem key={role?.id} value={role?.id}>
                        {role?.name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <Box></Box>
                )}
              </TextField>
              <Typography className="errorText">
                {formik.touched.default_role && formik.errors.default_role}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="userMdal__Actions">
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

export default UserModal;

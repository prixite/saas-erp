import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Grid, TextField, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import ChangePassword from "@src/components/common/presentational/changePassword/changePassword";
import ProfilePageHeader from "@src/components/common/presentational/profilePageHeader/ProfilePageHeader";
import { timeOut } from "@src/helpers/constants/constants";
import {
  LocalizationInterface,
  S3Interface,
} from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { uploadImageToS3 } from "@src/helpers/utils/uploadImage";
import {
  emailRegX,
  nameRegex,
  phoneRegex,
  toastAPIError,
} from "@src/helpers/utils/utils";
import {
  useGetUserQuery,
  useUpdateOwnerProfileMutation,
} from "@src/store/reducers/employees-api";
import "@src/components/common/smart/profile/profilePage.scss";

const inputLabelColor = { color: "rgba(0, 0, 0, 0.8) !important" };
const label = { inputProps: { "aria-label": "Checkbox demo" } };
function ProfilePage() {
  const { data: userData, isSuccess } = useGetUserQuery();
  const [loading, setLoading] = useState(false);
  const [updateProfile] = useUpdateOwnerProfileMutation();

  const constantData: LocalizationInterface = localizedData();
  const {
    basicInformationHeading,
    notificationHeading,
    newsLetterLabel,
    billUpdatesLabel,
    newTeamMembersLabel,
    emailSub,
    phoneSub,
    saveBtn,
    firstNameRequired,
    lastNameRequired,
    emailRequired,
    phoneRequired,
    firstNameError,
    lastNameError,
    emailError,
    phoneError,
    headlineRequired,
  } = constantData.ProfilePage;

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      image: "",
      headline: "",
    },
    validationSchema: yup.object({
      firstname: yup
        .string()
        .matches(nameRegex, firstNameError)
        .required(firstNameRequired),
      lastname: yup
        .string()
        .matches(nameRegex, lastNameError)
        .required(lastNameRequired),
      email: yup
        .string()
        .matches(emailRegX, emailError)
        .required(emailRequired),
      phone: yup
        .string()
        .matches(phoneRegex, phoneError)
        .required(phoneRequired),
      headline: yup.string().required(headlineRequired),
    }),
    validateOnChange: true,
    onSubmit: () => {
      handleEditOwner();
    },
  });

  useEffect(() => {
    if (userData && isSuccess) {
      formik.setValues({
        email: userData?.email || "",
        firstname: userData?.first_name || "",
        lastname: userData?.last_name || "",
        phone: userData?.contact_number || "",
        image: userData?.image || "",
        headline: userData?.headline,
      });
    }
  }, [userData, isSuccess]);
  const handleEditOwner = async () => {
    setLoading(true);
    if (formik.values.image?.length) {
      performEditOwner(formik.values.image);
    } else {
      await uploadImageToS3(formik.values.image || "")
        .then(async (data: S3Interface) => {
          performEditOwner(data.location);
        })
        .catch((error) => {
          toastAPIError("Something went wrong.", error.status, error.data);
        });
    }
  };
  const performEditOwner = async (data: string) => {
    const updatedObj = getEmployeeObject(data);
    await updateProfile({ updatedObj: updatedObj })
      .unwrap()
      .then(async () => {
        toast.success("Profile successfully updated.", {
          autoClose: timeOut,
          pauseOnHover: false,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastAPIError("Something went wrong.", error.status, error.data);
      });
  };
  const getEmployeeObject = (imageUrl: string) => {
    return {
      first_name: formik.values.firstname,
      last_name: formik.values.lastname,
      image: imageUrl,
      contact_number: formik.values.phone,
      headline: formik.values.headline,
    };
  };

  return (
    <>
      <ProfilePageHeader formik={formik} />
      <div className="profilePage">
        <div className="basicInfo">
          <div className="basicInfo__heading">
            <Typography className="basicInfo__heading__text" gutterBottom>
              {basicInformationHeading}
            </Typography>
          </div>

          <div className="basicInfo__namesAndEmails">
            <div className="firstName">
              <TextField
                className="firstName__textfield"
                name="firstname"
                label="First Name"
                InputLabelProps={{
                  style: inputLabelColor,
                }}
                value={formik.values.firstname}
                onChange={formik.handleChange}
              />
              <p className="requiredText">
                {formik.touched.firstname && formik.errors.firstname}
              </p>
            </div>
            <div className="lastName">
              <TextField
                className="lastName__textfield"
                name="lastname"
                label="Last Name"
                size="medium"
                InputLabelProps={{
                  style: inputLabelColor,
                }}
                value={formik.values.lastname}
                onChange={formik.handleChange}
              />
              <p className="requiredText">
                {formik.touched.lastname && formik.errors.lastname}
              </p>
            </div>
            <div className="email">
              <TextField
                className="email__textfield"
                name="email"
                label="Email Address"
                size="medium"
                disabled={true}
                InputLabelProps={{
                  style: inputLabelColor,
                }}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <p className="requiredText">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>
          </div>

          <div className="basicInfo__phoneheadline">
            <div className="headline-cls">
              <TextField
                className="textfield"
                name="phone"
                type="phone"
                label="Phone Number"
                size="medium"
                inputProps={{
                  autoComplete: "new-password",
                }}
                InputLabelProps={{
                  style: inputLabelColor,
                }}
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              <p className="requiredText">
                {formik.touched.phone && formik.errors.phone}
              </p>
            </div>
            <div className="phone">
              <TextField
                className="textfield"
                name="headline"
                type="phone"
                label="Headline"
                size="medium"
                InputLabelProps={{
                  style: inputLabelColor,
                }}
                value={formik.values.headline}
                onChange={formik.handleChange}
              />
              <p className="requiredText">
                {formik.touched.headline && formik.errors.headline}
              </p>
            </div>
          </div>
          <div className="btns">
            <Stack spacing={2} direction="row">
              <LoadingButton
                loading={loading}
                className="btns__saveBtn"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                <span className="btns__saveBtn__btnText">{saveBtn}</span>
              </LoadingButton>
            </Stack>
          </div>
        </div>
        <ChangePassword />
        <div className="notification">
          <Typography
            className="notification__heading"
            variant="h4"
            gutterBottom
          >
            {notificationHeading}
          </Typography>
          <Grid className="notification__checkBoxDiv" flexDirection="column">
            <div className="A">
              <div className="A__billUpdates">{billUpdatesLabel}</div>
              <div className="A__checkBoxContainer">
                <div className="A__checkBoxContainer__one">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Typography variant="subtitle1">{emailSub}</Typography>
                </div>

                <div className="A__checkBoxContainer__two">
                  <Checkbox
                    {...label}
                    defaultChecked
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Typography variant="subtitle1">{phoneSub}</Typography>
                </div>
              </div>
            </div>

            <div className="B">
              <div className="B__billUpdates">{newTeamMembersLabel}</div>
              <div className="B__checkBoxContainer">
                <div className="B__checkBoxContainer__one">
                  <Checkbox
                    {...label}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Typography variant="subtitle1"></Typography>
                </div>

                <div className="B__checkBoxContainer__two">
                  <Checkbox
                    {...label}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Typography variant="subtitle1"></Typography>
                </div>
              </div>
            </div>

            <div className="C">
              <div className="C__billUpdates">{newsLetterLabel}</div>
              <div className="C__checkBoxContainer">
                <div className="C__checkBoxContainer__one">
                  <Checkbox
                    {...label}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Typography variant="subtitle1"></Typography>
                </div>

                <div className="C__checkBoxContainer__two">
                  <Checkbox
                    {...label}
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                  <Typography variant="subtitle1"></Typography>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

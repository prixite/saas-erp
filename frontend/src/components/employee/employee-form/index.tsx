import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as yup from "yup";
import BasicInformations from "@src/components/employee/employee-form/basic-informations";
import Education from "@src/components/employee/employee-form/education";
import Experience from "@src/components/employee/employee-form/experience";

const FORM_DATA_KEY = "app_form_local_data";

export const usePersistForm = ({ value, localStorageKey }) => {
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return;
};

interface IFormInputs {
  name: string;
  email: string;
  phone: number;
  cnic: number;
  password: string;
  dateStarted: Date;
  manager: string;
  designation: string;
  salary: number;
  managing: string;
  employmentType: string;
  assets: string;
  emergencyContact: number;
  compansationBenefits: string[];
  designationExp: string;
  company: string;
  dateStartedExp: Date;
  dateEndedExp: Date;
  currentlyWorking: string[];
  degree: string;
  university: string;
  dateStartedEdu: string;
  dateEndedEdu: string;
  currentlyInProgressEdu: string[];
}
//validation schema for create employee form
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .required()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid!"
    )
    .min(10, "to short Phone Number")
    .max(14, "to long Phone Number"),
  cnic: yup.number().required().positive().integer(),
  // dateStarted: yup.date().default(function () {
  //   return new Date();
  // }),
  manager: yup.string().required(),
  designation: yup.string().required(),
  salary: yup.number().required(),
  managing: yup.string().required(),
  employmentType: yup.string().required(),
  // assets: yup.string().required(),
  emergencyContact: yup.number().required(),
  // compansationBenefits: yup.string().required(),
});
const steps = ["Basic Info", "Experience", "Education"];

export default function EmployeeForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  //methods include all methods of useForm()
  const methods = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
  const formSubmitHandler: SubmitHandler<IFormInputs> = () => {
    //handle next step code started
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    //handle next step code ended

    // console.log("Form data is.....", data);
  };

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSteps = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <BasicInformations setValue={methods.setValue} />;
      case 1:
        return <Experience setValue={methods.setValue} />;
      case 2:
        return <Education setValue={methods.setValue} />;
      default:
        throw new Error("Unknown step");
    }
  };

  usePersistForm({
    value: methods.setValue,
    localStorageKey: FORM_DATA_KEY,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FormProvider {...methods}>
            <form>
              {handleSteps(activeStep)}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={handleSkip}
                    sx={{ mr: 1 }}
                  >
                    Skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={methods.handleSubmit(formSubmitHandler)}
                  endIcon={<SendIcon />}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </form>
          </FormProvider>
        </React.Fragment>
      )}
    </Box>
  );
}

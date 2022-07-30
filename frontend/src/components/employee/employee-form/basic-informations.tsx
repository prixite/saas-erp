// import { Grid, Button } from "@mui/material";
// import { useForm } from "react-hook-form";
// import Controls from "@src/components/shared/form-controls/Controls";

// interface IFormInput {
//   textValue: string;
// }

// const defaultValues = {
//   textValue: "",
// };
// const BasicInformations = () => {
//   const methods = useForm<IFormInput>({ defaultValues: defaultValues });
//   const { handleSubmit, reset, control, setValue, watch } = methods;
//   const onSubmit = (data: IFormInput) => console.log(data);

//   return (
//     <>
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         spacing={3}
//         mt={3}
//       >
//         <Grid item xs={12} md={6} lg={6}>
//           <Controls.Input
//             name="textValue"
//             control={control}
//             label="First Name"
//           />
//         </Grid>
//         <Grid item xs={12} md={6} lg={6}>
//           <Controls.Input
//             name="textValue"
//             control={control}
//             label="Last Name"
//           />
//         </Grid>

//         <Grid item>
//           <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
//             {" "}
//             Submit{" "}
//           </Button>
//         </Grid>
//       </Grid>
//     </>
//   );
// };
// export default BasicInformations;

// import { Grid, Button } from "@mui/material";
// import { useForm, SubmitHandler, Controller } from "react-hook-form";
// import Controls from "@src/components/shared/form-controls/Controls";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { TextField } from "@mui/material";
// import * as yup from "yup";

// interface IFormInputs {
//   email: string;
//   password: string;
// }

// const schema = yup.object().shape({
//   email: yup.string().email().required(),
//   password: yup.string().min(4).max(20).required(),
// });
// const BasicInformations = () => {

//   const {
//     control,
//     handleSubmit,
//     watch,

//     formState: { errors },
//   } = useForm<IFormInputs>({
//     resolver: yupResolver(schema),
//   });

//   const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
//     console.log("Form data is.....", data);
//   };

//   console.log("watch for email......", watch("email"));

//   return (
//     <>
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         spacing={3}
//         mt={3}
//       >
//         <form onSubmit={handleSubmit(formSubmitHandler)}>
//           <Controller
//             name="email"
//             defaultValue="test@gmail.coml"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 error={!!errors.email}
//                 helperText={errors.email ? errors.email?.message : ""}
//               />
//             )}
//           />
//           <br />
//           <br />
//           <Controller
//             name="password"
//             defaultValue=""
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Password"
//                 variant="outlined"
//                 fullWidth
//                 error={!!errors.password}
//                 helperText={errors.password ? errors.password?.message : ""}
//               />
//             )}
//           />
//           <br />
//           <br />

//           <br />
//           <input type="submit" />
//         </form>
//       </Grid>
//     </>
//   );
// };
// export default BasicInformations;

import { Grid } from "@mui/material";
import Controls from "@src/components/shared/form-controls/Controls";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const BasicInformations = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        mt={3}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default BasicInformations;

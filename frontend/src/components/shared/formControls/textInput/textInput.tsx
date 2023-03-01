import { Box, InputAdornment, TextField } from "@mui/material";
import searchBox from "@src/assets/svgs/searchBox.svg";
import "@src/components/shared/formControls/textInput/textInput.scss";

interface FormInputProps {
  setSearchText?: (arg: string) => void;
}

const Input = ({ setSearchText }: FormInputProps) => {
  const handleInput = (e: { target: { value: string } }) => {
    setSearchText(e.target.value);
  };
  return (
    <Box className="text-cls">
      <TextField
        className="searchbox"
        id="search-headbox"
        variant="outlined"
        onChange={handleInput}
        placeholder="Search Employee here"
        sx={{
          "& label.Mui-focused": {
            color: "#999999",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#E7E7E7",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E7E7E7",
            },
            "&:hover fieldset": {
              borderColor: "#999999",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#999999",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* SearchBoxSVG */}
              <img className="profile-pic" src={searchBox} alt="profile pic" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
export default Input;

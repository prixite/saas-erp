import { InputAdornment, TextField } from "@mui/material";
import SearchBoxSVG from "../SearchBoxSVG";

function SearchAreaBox() {
  return (
    <TextField
      className="searchbox"
      id="search-headbox"
      variant="outlined"
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
            <SearchBoxSVG />
          </InputAdornment>
        ),
      }}
    />
  );
}
export default SearchAreaBox;

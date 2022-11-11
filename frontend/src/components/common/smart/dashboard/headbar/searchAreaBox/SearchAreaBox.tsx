import { InputAdornment, TextField } from "@mui/material";
import searchBox from "@src/assets/svgs/searchBox.svg";

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
            {/* SearchBoxSVG */}
            <img className="profile-pic" src={searchBox} alt="profile pic" />
          </InputAdornment>
        ),
      }}
    />
  );
}
export default SearchAreaBox;

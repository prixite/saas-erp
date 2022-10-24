import { InputAdornment, TextField } from "@mui/material";
import SearchBoxSVG from "../SearchBoxSVG";

function SearchAreaBox() {
  return (
    <TextField
      className="searchbox"
      id="search-headbox"
      variant="outlined"
      placeholder="Search Employee here"
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

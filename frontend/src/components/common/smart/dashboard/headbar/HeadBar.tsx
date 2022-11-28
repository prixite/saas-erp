// import { useCallback, useEffect } from "react";
// import "./headbar.scss";
// import { InputAdornment, TextField } from "@mui/material";
// import debounce from "debounce";
// import searchBox from "@src/assets/svgs/searchBox.svg";
// import CreateButton from "@src/components/common/smart/dashboard/headbar/createButton/CreateButton";
// import FilterButton from "@src/components/common/smart/dashboard/headbar/filterButton/FilterButton";
// import SearchAreaBox from "@src/components/common/smart/dashboard/headbar/searchAreaBox/SearchAreaBox";
// import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
// import { localizedData } from "@src/helpers/utils/language";
// interface Props {
//   setList?: (arg: { query: string; results?: { name: string }[] }) => void;
//   actualData?: unknown;
//   searchText: string;
//   setSearchText: (arg: string) => void;
//   handleSearchQuery?: (arg: string) => void;
// }

// function HeadBar({
//   setList,
//   actualData,
//   handleSearchQuery,
//   searchText,
//   setSearchText,
// }: Props) {
//   const constantData: LocalizationInterface = localizedData();
//   const { employeeHeading } = constantData.Employee;
//   const onEventSearch = useCallback(
//     debounce((searchQuery: string) => {
//       if (searchQuery?.length >= 1) {
//         const newList = { query: searchQuery, results: [] };
//         searchQuery = searchQuery?.toLowerCase()?.trim();
//         const result = actualData?.filter(
//           (data: { first_name: string; last_name: string }) => {
//             return (
//               data?.first_name?.toLowerCase().trim().search(searchQuery) != -1
//             );
//           }
//         );
//         newList.results = result;
//         setList(newList);
//       }
//     }, 500),
//     [actualData]
//   );
//   useEffect(() => {
//     onEventSearch(searchText);
//   }, [searchText]);
//   const handleInput = (e: { target: { value: string } }) => {
//     setSearchText(e.target.value);
//   };
//   return (
//     <>
//       <div className="x">
//         <div className="x-1">
//           <span>{employeeHeading}</span>
//         </div>
//         <div className="x-2">
//           <TextField
//             className="searchbox"
//             id="search-headbox"
//             value={searchText}
//             variant="outlined"
//             onChange={handleInput}
//             placeholder="Search Employee here"
//             sx={{
//               "& label.Mui-focused": {
//                 color: "#999999",
//               },
//               "& .MuiInput-underline:after": {
//                 borderBottomColor: "#E7E7E7",
//               },
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#E7E7E7",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#999999",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#999999",
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   {/* SearchBoxSVG */}
//                   <img
//                     className="profile-pic"
//                     src={searchBox}
//                     alt="profile pic"
//                   />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>
//         <div className="x-3">
//           <FilterButton />
//         </div>
//         <div className="x-4">
//           <CreateButton />
//         </div>
//       </div>
//     </>
//   );
// }

// export default HeadBar;

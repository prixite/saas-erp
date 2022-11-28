// import { useState, useEffect } from "react";
// import { Box, IconButton, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import DeleteIcon from "@src/assets/svgs/DeleteIcon.svg";
// import EditIcon from "@src/assets/svgs/Edit.svg";
// import NotfoundIcon from "@src/assets/svgs/notfound.svg";
// import ShowIcon from "@src/assets/svgs/ShowIcon.svg";
// import HeadBar from "@src/components/common/smart/dashboard/headbar/HeadBar";
// import RowSkeletonCard from "@src/components/shared/loaders/rowSkeletonCard/rowSkeletonCard";
// import { employeeConstants } from "@src/helpers/constants/constants";
// import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
// import { localizedData } from "@src/helpers/utils/language";
// import { useGetEmployeesQuery } from "@src/store/reducers/employees-api";
// import "@src/components/common/presentational/dataGridTable/dataGridTable.scss";
// function DataGridTable() {
//   const navigate = useNavigate();
//   const { data: rows, isSuccess, isLoading } = useGetEmployeesQuery();
//   const constantData: LocalizationInterface = localizedData();
//   const { notFound } = constantData.Employee;
//   const [docData, setDocData] = useState([]);
//   const [searchedList, setSearchedList] = useState({});
//   const [docList, setDocList] = useState(null);
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState<number>(0);
//   const [pageSize, setPageSize] = useState<number>(10);
//   const columns = [
//     {
//       field: "id",
//       headerName: "ID",
//       sortable: false,
//       width: 200,
//       headerAlign: "start",
//       renderCell: (cellValues) => {
//         return (
//           <p className="para" style={{ marginLeft: "20px" }}>
//             {cellValues?.row?.org_id}
//           </p>
//         );
//       },
//     },
//     {
//       field: "name",
//       headerName: "Name",
//       sortable: false,
//       width: 400,
//       headerAlign: "start",
//       renderCell: (cellValues) => {
//         return (
//           <div
//             style={{
//               marginLeft: "20px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-start",
//             }}
//           >
//             <img
//               style={{
//                 height: "32px",
//                 left: "241px",
//                 top: "154px",
//                 marginRight: "8px",
//                 borderRadius: "50%",
//               }}
//               src={`${cellValues.row.avatar}`}
//               alt="profile pic"
//             />
//             <p>{`${cellValues.row.first_name} ${cellValues.row.last_name}`}</p>
//           </div>
//         );
//       },
//     },
//     {
//       field: "contact_Number",
//       headerName: "Contact Number",
//       sortable: false,
//       width: 350,
//       headerAlign: "start",
//       renderCell: (cellValues) => {
//         return (
//           <p style={{ marginLeft: "20px" }}>
//             {cellValues?.row?.contact_number}
//           </p>
//         );
//       },
//     },
//     {
//       field: "joining_Date",
//       headerName: "Joining Date",
//       sortable: false,
//       width: 350,
//       headerAlign: "start",
//       renderCell: (cellValues) => {
//         return (
//           <p style={{ marginLeft: "20px" }}>
//             {moment(cellValues?.row?.date_of_joining).format("ll")}
//           </p>
//         );
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       headerAlign: "start",
//       width: 350,
//       renderCell: () => {
//         return (
//           <Box
//             className="renderCell-joiningDate"
//             style={{ marginLeft: "10px" }}
//           >
//             <IconButton
//               onClick={handleIconClicks}
//               aria-label="edit"
//               id="edit-btn-id"
//               className="edit-btn"
//             >
//               <img className="profile-pic" src={EditIcon} alt="profile pic" />
//             </IconButton>
//             <IconButton
//               aria-label="Show"
//               id="show-btn-id"
//               className="delete-btn"
//             >
//               <img className="profile-pic" src={ShowIcon} alt="profile pic" />
//             </IconButton>
//             <IconButton
//               onClick={handleIconClicks}
//               aria-label="delete"
//               id="delete-btn-id"
//               className="delete-btn"
//             >
//               <img className="profile-pic" src={DeleteIcon} alt="profile pic" />
//             </IconButton>
//           </Box>
//         );
//       },
//       valueGetter: (params) =>
//         `${params.getValue(params.id, "firstName") || ""} ${
//           params.getValue(params.id, "contact_Number") || ""
//         }`,
//     },
//   ];
//   // console.log("query value", query);
//   // console.log("searchlist results", searchedList);
//   useEffect(() => {
//     if (query?.trim().length > 2 && searchedList) {
//       // console.log("doclist inside useeffect", docList);
//       setDocList(docList);
//       handleSearchQuery(query);
//     } else if (docData?.length && query?.trim().length <= 2) {
//       setDocList(docData);
//     }
//   }, [query, searchedList, docData]);
//   useEffect(() => {
//     const dataArray = [];
//     rows?.map((row) => {
//       const obj = {
//         id: row?.org_id,
//         first_name: row?.user?.first_name,
//         last_name: row?.user?.last_name,
//         contact: row?.contact_number,
//         joining_date: row?.date_of_joining,
//         avatar: row?.user?.avatar,
//       };
//       dataArray.push(obj);
//     });
//     setDocData([...dataArray]);
//   }, [rows]);
//   // console.log("docdata is", docData);
//   const handleSearchQuery = async (searchQuery: string) => {
//     // console.log("search query is", searchQuery);
//     const itemsToBeSet = [
//       ...docData?.filter((doc) => {
//         return (
//           (
//             doc?.org_id +
//             doc?.user?.first_name +
//             doc?.user?.last_name +
//             doc?.contact_number +
//             doc?.date_of_joining
//           )
//             ?.trim()
//             .toLowerCase()
//             .search(searchQuery?.trim().toLowerCase()) != -1
//         );
//       }),
//     ];
//     if (docData && docData.length) {
//       await Promise.all([itemsToBeSet, setDocList(itemsToBeSet)]);
//     }
//   };
//   const handleIconClicks = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//   };
//   const handleOnCellClick = (params) => {
//     navigate(`/react/employees/${params.row.id}`);
//   };
//   return (
//     <Box className="dataGridTable-section">
//       <HeadBar
//         setList={setSearchedList}
//         actualData={rows}
//         searchText={query}
//         setSearchText={setQuery}
//       />
//       {isSuccess ? (
//         <>
//           {rows?.length ? (
//             <div className="dataGridTable-main">
//               <DataGrid
//                 className="dataGrid"
//                 rowHeight={80}
//                 autoHeight
//                 rows={[...rows]}
//                 columns={[...columns]}
//                 disableColumnFilter
//                 disableColumnMenu
//                 disableColumnSelector
//                 pageSize={pageSize}
//                 onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                 rowsPerPageOptions={[10, 20]}
//                 rowCount={10}
//                 pagination
//                 paginationMode="server"
//                 density="standard"
//                 onCellClick={handleOnCellClick}
//                 page={page}
//                 onPageChange={(_page) => {
//                   setPage(_page);
//                 }}
//                 initialState={{
//                   pagination: {
//                     page: 0,
//                     pageSize: 10,
//                   },
//                 }}
//                 loading={isLoading}
//                 sx={{
//                   cursor: "pointer",
//                   "& renderCell-joiningDate MuiBox-root css-0:focus": {
//                     outline: "none",
//                   },
//                   "& .MuiDataGrid-columnHeaders": {
//                     backgroundColor: "#(207,207,207, 0.2)",
//                     fontFamily: "Lato",
//                     fontStyle: "normal",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     lineHeight: "18px",
//                     letterSpacing: "-0.011em",
//                     color: "#6C6C6C",
//                     ":focus": {
//                       outline: "white",
//                     },
//                   },
//                   "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
//                     width: "101px",
//                     height: "18px",
//                     fontFamily: "Lato",
//                     fontStyle: "normal",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     lineHeight: "18px",
//                     letterSpacing: "-0.011em",
//                     color: "#6C6C6C",
//                     marginLeft: "20px",
//                     marginTop: "16px",
//                     marginBottom: "16px",
//                     marginRight: "16px",
//                   },
//                   "& .MuiDataGrid-virtualScrollerRenderZone": {
//                     "& .MuiDataGrid-row": {
//                       backgroundColor: "white",
//                     },
//                   },
//                   "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within": {
//                     outline: "none",
//                   },
//                   "& .css-1lk0jn-MuiDataGrid-root .MuiDataGrid-columnSeparator--sideRight":
//                     {
//                       opacity: 0,
//                     },
//                   "& .css-iibd7p-MuiDataGrid-root.MuiDataGrid-autoHeight": {
//                     border: "white",
//                   },
//                   "& .MuiDataGrid-columnSeparator": {
//                     visibility: "hidden",
//                     display: "none",
//                   },
//                   "& .MuiDataGrid-cell:hover": {
//                     color: "black",
//                   },
//                   "& .MuiDataGrid-row:hover": {
//                     backgroundColor: "#F5F5F5",
//                   },
//                   "& .MuiDataGrid-row.Mui-selected:hover, .css-vgcejw-MuiDataGrid-root .MuiDataGrid-row.Mui-selected.Mui-hovered":
//                     {
//                       backgroundColor: "white",
//                     },
//                   "&.MuiDataGrid-root .MuiDataGrid-cell:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
//                     {
//                       outline: "none",
//                     },
//                   "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, .MuiDataGrid-root .MuiDataGrid-cell:focus":
//                     {
//                       outline: "none",
//                     },
//                   "& .css-17jjc08-MuiDataGrid-footerContainer": {},
//                 }}
//               />
//             </div>
//           ) : (
//             <Box className="error-img">
//               <img src={NotfoundIcon} alt="notfound" />
//               <Typography className="error-msg">
//                 {employeeConstants.employees}
//                 {notFound}
//               </Typography>
//             </Box>
//           )}
//         </>
//       ) : (
//         <>
//           <RowSkeletonCard />
//         </>
//       )}
//     </Box>
//   );
// }
// export default DataGridTable;

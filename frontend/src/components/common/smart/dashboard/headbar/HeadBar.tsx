import "./headbar.scss";
import CreateButton from "@src/components/common/smart/dashboard/headbar/createButton/CreateButton";
import FilterButton from "@src/components/common/smart/dashboard/headbar/filterButton/FilterButton";
import SearchAreaBox from "@src/components/common/smart/dashboard/headbar/searchAreaBox/SearchAreaBox";

function HeadBar() {
  return (
    <>
      <div className="x">
        <div className="x-1">
          <span>Employee’s Module</span>
        </div>
        <div className="x-2">
          <SearchAreaBox />
        </div>
        <div className="x-3">
          <FilterButton />
        </div>
        <div className="x-4">
          <CreateButton />
        </div>
      </div>
    </>
  );
}

export default HeadBar;

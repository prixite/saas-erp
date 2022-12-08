import "./headbar.scss";
import CreateButton from "@src/components/common/smart/dashboard/headbar/createButton/CreateButton";
import FilterButton from "@src/components/common/smart/dashboard/headbar/filterButton/FilterButton";
import SearchAreaBox from "@src/components/common/smart/dashboard/headbar/searchAreaBox/SearchAreaBox";
import { LocalizationInterface } from "@src/helpers/interfaces/localizationinterfaces";
import { localizedData } from "@src/helpers/utils/language";
import { useGetFlagsQuery } from "@src/store/reducers/employees-api";

function HeadBar() {
  const constantData: LocalizationInterface = localizedData();
  const { employeeHeading } = constantData.Employee;
  const { data: Flags = [] } = useGetFlagsQuery();
  const allFlags = Object.assign({}, ...Flags);
  return (
    <>
      <div className="x">
        <div className="x-1">
          <span>{employeeHeading}</span>
        </div>
        {allFlags.show_search_module ? (
          <div className="x-2">
            <SearchAreaBox />
          </div>
        ) : (
          ""
        )}
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

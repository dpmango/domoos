import { combineReducers } from "redux";

import citiesList from "./citiesList";
import cityInfo from "./cityInfo";
import cityDevelopers from "./cityDevelopers";
import cityBuildings from "./cityBuildings";
import cityAgencies from "./cityAgencies";
import citiesMapInfo from "./citiesMapInfo";

export default combineReducers({
	citiesList,
	cityInfo,
	cityDevelopers,
	cityBuildings,
	cityAgencies,
	citiesMapInfo
});

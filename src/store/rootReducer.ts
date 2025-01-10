import { combineReducers } from "redux";
import authReducer from "../app/signup/redux/authSlice";
import userReducer from "../app/admin/users/redux/userSlice";
import adminReducer from "../app/admin/login/redux/adminLoginSlice";
import packagesReducer from "../app/sender/dashboard/redux/packagesSlice";
import tripsReducer from "../app/traveler/redux/tripsSlice";
import adminpackagesReducer from "../app/admin/packages/redux/packagesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  packages: packagesReducer,
  trips: tripsReducer,
  users: userReducer,
  admin: adminReducer,
  adminpackages: adminpackagesReducer,
});

export default rootReducer;

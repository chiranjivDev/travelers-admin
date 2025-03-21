import { combineReducers } from 'redux';
import authReducer from '../app/signup/redux/authSlice';
import userReducer from '../app/admin/users/redux/userSlice';
import adminReducer from '../app/admin/login/redux/adminLoginSlice';
import packagesReducer from '../app/sender/dashboard/redux/packagesSlice';
import tripsReducer from '../app/traveler/redux/tripsSlice';
import adminpackagesReducer from '../app/admin/packages/redux/packagesSlice';
import orderReducer from '../app/sender/dashboard/redux/orderSlice';
import adminadmintravelerReducer from '../app/admin/travelers/redux/travelerSlice';
import chatReducer from '../app/chat/redux/chatsSlice';
import reviewsReducer from '../app/traveler/[id]/reviews/redux/reviewsSlice';
import issuesReducer from '../app/issue/redux/issueSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  packages: packagesReducer,
  trips: tripsReducer,
  reviews: reviewsReducer,
  issues: issuesReducer,
  users: userReducer,
  admin: adminReducer,
  adminpackages: adminpackagesReducer,
  order: orderReducer,
  chats: chatReducer,
  admintraveler: adminadmintravelerReducer,
});

export default rootReducer;

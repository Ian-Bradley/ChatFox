import userReducer from './features/user.feature.js';
import userTotalReducer from './features/userTotal.feature.js';
import preferencesReducer from './features/preferences.feature.js';

const rootReducer = {
    user: userReducer,
    userTotal: userTotalReducer,
    preferences: preferencesReducer,
}
export default rootReducer;
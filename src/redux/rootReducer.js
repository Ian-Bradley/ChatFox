import userReducer from "./features/user.feature.js";
import userTotalReducer from "./features/userTotal.feature.js";

const rootReducer = {
    user: userReducer,
    userTotal: userTotalReducer,
}
export default rootReducer;
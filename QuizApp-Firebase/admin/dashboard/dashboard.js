import { logoutAction } from "../../utils/authActions.js";

const logoutHandler = () => {
    logoutAction();
};

window.logoutHandler = logoutHandler;
import { logoutAction } from "../../utils/actions.js";

const logoutHandler = () => {
    logoutAction();
};

window.logoutHandler = logoutHandler;
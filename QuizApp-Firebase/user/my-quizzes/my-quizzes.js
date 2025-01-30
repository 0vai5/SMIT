import { logoutAction } from "../../utils/authActions.js";

const logoutHandler = async () => {
  const response = await logoutAction();
};

window.logoutHandler = logoutHandler;

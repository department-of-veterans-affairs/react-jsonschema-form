import PropTypes from "prop-types";
import React from "react";

import BaseInput from "./BaseInput";


function PasswordWidget(props) {
  return <BaseInput type="password" {...props}/>;
}

if (process.env.NODE_ENV !== "production") {
  PasswordWidget.propTypes = {
    value: PropTypes.string,
  };
}

export default PasswordWidget;

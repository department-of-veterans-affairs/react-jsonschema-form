/* This file has been modified from the original forked source code */
import PropTypes from "prop-types";
import React from "react";


function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    value,
    readonly,
    autofocus,
    onBlur,
    options,  // eslint-disable-line
    schema,   // eslint-disable-line
    formContext,  // eslint-disable-line
    registry, // eslint-disable-line
    ...inputProps
  } = props;
  const _onChange = ({target: {value}}) => {
    return props.onChange(value === "" ? undefined : value);
  };
  // see https://github.com/rjsf-team/react-jsonschema-form/pull/1705
  if (options.autocomplete) {
    inputProps.autoComplete = options.autocomplete;
  }
  return (
    <input
      {...inputProps}
      className="form-control"
      readOnly={readonly}
      autoFocus={autofocus}
      value={value == null ? "" : value}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}/>
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  };
}

export default BaseInput;

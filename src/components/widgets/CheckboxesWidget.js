/* This file has been modified from the original forked source code */
import PropTypes from "prop-types";
import React from "react";


function selectValue(value, selected, all) {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
}

function deselectValue(value, selected) {
  return selected.filter(v => v !== value);
}

function CheckboxesWidget(props) {
  const {id, disabled, options, value, autofocus, onChange} = props;
  const {enumOptions, inline} = options;
  return (
    <div className="checkboxes" id={id}>{
      enumOptions.map((option, index) => {
        const checked = value.indexOf(option.value) !== -1;
        const disabledCls = disabled ? "disabled" : "";
        const checkbox = (
          <span>
            <input type="checkbox"
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled}
              autoFocus={autofocus && index === 0}
              onChange={(event) => {
                const all = enumOptions.map(({value}) => value);
                if (event.target.checked) {
                  onChange(selectValue(option.value, value, all));
                } else {
                  onChange(deselectValue(option.value, value));
                }
              }}/>
            <span>{option.label}</span>
          </span>
        );
        return inline ? (
          <label key={index} className={`checkbox-inline ${disabledCls}`}>
            {checkbox}
          </label>
        ) : (
          <div key={index} className={`checkbox ${disabledCls}`}>
            <label>
              {checkbox}
            </label>
          </div>
        );
      })
    }</div>
  );
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false
  },
};

if (process.env.NODE_ENV !== "production") {
  CheckboxesWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxesWidget;

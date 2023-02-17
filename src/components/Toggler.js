import PropTypes from "prop-types";
import { useState } from "react";

const Toggler = (props) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = visible ? "" : "none";
  const hideWhenVisible = visible ? "none" : "";

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={{ display: hideWhenVisible }}>
        <button onClick={() => handleToggle()}>{props.openButtonLabel}</button>
      </div>
      <div style={{ display: showWhenVisible }}>
        {props.children}
        <button onClick={() => handleToggle()}>{props.closeButtonLabel}</button>
      </div>
    </div>
  );
};

//Does nothing to our app. Just prints on console if any of these types are missing
Toggler.propTypes = {
  openButtonLabel: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string.isRequired
};

export default Toggler;

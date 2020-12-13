import React from "react";
import PropTypes from "prop-types";

const ToggleButton = ({ activated, handleClick }) => {
  return activated ? (
    <button className="button is-small is-danger" onClick={handleClick}>
      Desativar
    </button>
  ) : (
    <button className="button is-small is-success" onClick={handleClick}>
      Ativar
    </button>
  );
};

ToggleButton.propTypes = {
  activated: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ToggleButton;

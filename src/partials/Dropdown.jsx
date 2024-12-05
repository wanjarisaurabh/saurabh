import React from "react";

const Dropdown = ({ title, options, fun }) => {

  return (
    <div className="dropdown">
      <div className="select">
        <select defaultValue="0" onChange={fun} name="format" id="format">
          <option value="0" disabled>
            {title}
          </option>
          {options.map((o, i) => (

            <option onChange = { (e) => handl   }key={i} value={o}>
             
              {o.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;

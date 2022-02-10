import "./JoiningBox.style.css";
import React, { useEffect, useState } from "react";
import { Button, Select } from "@mui/material";

export default function JoiningBox({ handleClose, show, availablePlaces }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Button
          className="button_style1"
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClose}
        >
          Close
        </Button>
        <div className="role-selection-box">
        <label className="roleLabel">Select your role </label>
        <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={role}
                  label="Role"
                  // onChange={onRoleChange}
                >
                  {availablePlaces}
                </Select>
        </div>
        <Button
          className="button_style2"
          variant="contained"
          color="primary"
          size="small"
          onClick={handleClose}
        >
          Complete
        </Button>
      </section>
    </div>
  );
}

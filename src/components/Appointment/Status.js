import React from "react";

export default function Status(props) { //Message that indications appointment saving or deleting

  return(
    <main className="appointment__card appointment__card--status">
      <img
      className="appointment__status-image"
      src="images/status.png"
      alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  )
}


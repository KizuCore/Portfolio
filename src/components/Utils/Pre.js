import React from "react";

function Pre(props) {
  return <div id={props.load ? "preloader" : "preloader-none"} aria-hidden="true"></div>;
}

export default Pre;

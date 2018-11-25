// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Root from './components/Root'

// Put the things into the DOM!
// ReactDOM.render(<Root />, document.getElementById('root'))
// document.addEventListener("DOMContentLoaded", function() {
//     // const contentDiv = ;
//     const gridProps = window.gridProps || {};
//     ReactDOM.render(React.createElement(Root, gridProps), document.getElementById("root"));
// });


// var DevLayout = require("./test/11-no-vertical-compact.js");
// require("./test/test-hook.js")(DevLayout);
import NoCompactingLayout from "./test/11-no-vertical-compact.js"
import func from "./test/test-hook.js"
func(NoCompactingLayout)
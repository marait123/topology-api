// this code is just for manual testing and debugging purposes

const {
  readJSON,
  queryDevices,
  queryTopologies,
  writeJSON,
  queryDevicesWithNetlistNode,
} = require("./api/api");

readJSON("samples/topology1.json");
// console.log(readJSON("samples/topology1.json"));
// readJSON("samples/topology2.json");
// readJSON("samples/topology3.json");
console.log(queryDevices("top1", "n1"));
// console.log(queryDevicesWithNetlistNode("top1", "n1"));

/*
 */

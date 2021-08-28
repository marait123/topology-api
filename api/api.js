const fs = require("fs");
const { Device } = require("./device");
const { Topology } = require("./topology");

let topologies = [];

const Status = {
  FAIL: 0,
  SUCCESS: 1,
};

/** @class Result representing a result. */
class Result {
  /**
   * Creates an instance of Result
   *
   * @author: Mohammed Ibrahim Gabllah
   * @param {Status} status the status of the Result Status.SUCCESS or Status.FAIL
   * @param {Object} data this can be any object or array of Objects
   */
  constructor(status, data = {}) {
    this.status = status;
    this.data = data;
  }
}

exports.Result = Result;
exports.Status = Status;

/**
 * get you the topology object with topologyId as its id property
 *
 * @param {string} topologyId The id of the topology object.
 * @return {Topology} The topology object with that id.
 */
function getTopology(topologyId) {
  return topologies.find((topology) => {
    if (topology.id == topologyId) {
      return true;
    }
  });
}

/**
 * this function reads a json file at the path fileName and returns the result of reading
 * a json file with data set to the topology object
 *
 * @param {string} fileName the json file to read the object from
 * @return {Result} the result object that has a status and data properties .
 */
exports.readJSON = (fileName) => {
  try {
    let data = fs.readFileSync(fileName, "utf8");
    let topologyObject = JSON.parse(data);
    topologies.push(topologyObject);
    return new Result(Status.SUCCESS, topologyObject);
  } catch (error) {
    return new Result(Status.FAIL);
  }
};

/**
 * this function writes the topology with topologyId as its id property to a file that is names "topologyId.json"
 *
 * @param {string} topologyId the id of the topology object
 * @return {Result} the result object that has a status and data properties .
 */
exports.writeJSON = (topologyId) => {
  let topology = getTopology(topologyId);
  if (!topology) {
    return new Result(Status.FAIL);
  }
  try {
    let jsonStr = JSON.stringify(topology);

    fs.writeFileSync(topologyId + ".json", jsonStr, "utf8");
    return new Result(Status.SUCCESS, topology);
  } catch (error) {
    return new Result(Status.FAIL);
  }
};

/**
 * returns all the topologies there are in memory
 *
 * @return {Array<Topology>} the array of topologies found in memory.
 */
exports.queryTopologies = () => {
  return topologies;
};

/**
 * this function deletes the topology with topologyId as its id property
 *
 * @param {string} topologyId the id of the topology object
 * @return {Result} the result object that has a status ( success of fail ) and data properties .
 */
exports.deleteTopology = (topologyId) => {
  let top = getTopology(topologyId);
  if (!top) {
    return new Result(Status.FAIL);
  }
  topologies = topologies.filter((topology) => topology.id !== topologyId);

  return new Result(Status.SUCCESS, top);
};

/**
 * this function returns the array of devices found on a given topology (topology with id = topologyId)
 *
 * @param {string} topologyId the id of the topology object
 * @return {Array<Device>} an array of Device objects
 */
exports.queryDevices = (topologyId) => {
  let topology = getTopology(topologyId);
  if (topology) {
    return topology.components;
  } else {
    return undefined;
  }
};

/**
 * this function returns the array of devices found on the topology with topologyId as its id property
 * returns those devices that has node with id nodeId
 *
 * @param {string} topologyId the id of the topology object
 * @param {string} nodeId the id of node
 * @return {Array<Device>} an array of Device objects
 */
exports.queryDevicesWithNetlistNode = (topologyId, nodeId) => {
  let top = getTopology(topologyId);
  if (!top) {
    return new Result(Status.FAIL);
  }
  let devices = [];
  let components = top.components;
  for (let comp of components) {
    for (let nodeKey in comp.netlist) {
      if (comp.netlist[nodeKey] === nodeId) {
        devices.push(comp);
      }
    }
  }
  return new Result(Status.SUCCESS, devices);
};

const fs = require("fs");

let topologies = [];

const Status = {
  FAIL: 0,
  SUCCESS: 1,
};

class Result {
  constructor(status, data = {}) {
    this.status = status;
    this.data = data;
  }
}

exports.Result = Result;
exports.Status = Status;

function getTopology(topologyId) {
  return topologies.find((topology) => {
    if (topology.id == topologyId) {
      return true;
    }
  });
}

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

exports.queryTopologies = () => {
  return topologies;
};

exports.deleteTopology = (topologyId) => {
  let top = getTopology(topologyId);
  if (!top) {
    return new Result(Status.FAIL);
  }
  topologies = topologies.filter((topology) => topology.id !== topologyId);

  return new Result(Status.SUCCESS, top);
};

exports.queryDevices = (topologyId) => {
  let topology = getTopology(topologyId);
  if (topology) {
    return topology.components;
  } else {
    return undefined;
  }
};

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

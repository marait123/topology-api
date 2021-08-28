// // this code is just for manual testing and debugging purposes

const {
  Status,
  Result,
  readJSON,
  queryDevices,
  queryTopologies,
  writeJSON,
  queryDevicesWithNetlistNode,
  deleteTopology,
} = require("../api/api");
// let fs = require("fs");

// // jest.mock("fs");
// // jest.mock("JSON");
let disposableTops = [];

describe("readJSON testing", () => {
  beforeAll(() => {
    // populate the memory wth some topologies
    disposableTops.push(readJSON("samples/topology1.json"));
    disposableTops.push(readJSON("samples/topology1.json"));
  });
  afterAll(() => {
    for (let top of disposableTops) {
      deleteTopology(top.data.id);
    }
  });
  test("test readJSON returns success", () => {
    let res = readJSON("samples/topology4.json");
    expect(res.status).toBe(Status.SUCCESS);
    deleteTopology(res.data.id);
  });

  test("test readJSON returns Fail", () => {
    let res = readJSON("samples/topologyx.json");
    expect(res.status).toBe(Status.FAIL);
    deleteTopology(res.data.id);
  });
});

describe("queryTopologies", () => {
  beforeAll(() => {
    // populate the memory wth some topologies
    disposableTops.push(readJSON("samples/topology1.json"));
    disposableTops.push(readJSON("samples/topology1.json"));
  });
  afterAll(() => {
    for (let top of disposableTops) {
      deleteTopology(top.data.id);
    }
    disposableTops = [];
  });
  test("test queryTopologies returns 2 topology", () => {
    let tops = queryTopologies();
    expect(tops.length).toBe(2);
  });
});

describe("queryDevices", () => {
  beforeAll(() => {
    // populate the memory wth some topologies
    disposableTops.push(readJSON("samples/topology1.json"));
    disposableTops.push(readJSON("samples/topology2.json"));
  });
  afterAll(() => {
    for (let top of disposableTops) {
      deleteTopology(top.data.id);
    }
    disposableTops = [];
  });
  test("test queryDevices returns 5devices with for topology with id of top1 ", () => {
    let devices = queryDevices(disposableTops[0].data.id);
    expect(devices.length).toBe(5);
  });
});

describe("queryDevicesWithNetlistNode", () => {
  beforeAll(() => {
    // populate the memory wth some topologies
    disposableTops.push(readJSON("samples/topology1.json"));
    disposableTops.push(readJSON("samples/topology2.json"));
  });
  afterAll(() => {
    for (let top of disposableTops) {
      deleteTopology(top.data.id);
    }
    disposableTops = [];
  });
  test("test queryDevicesWithNetlistNode returns 3 devices with netlist node n1", () => {
    let data = queryDevicesWithNetlistNode(disposableTops[0].data.id, "n1");
    expect(data.status).toBe(Status.SUCCESS);
    expect(data.data.length).toBe(3);
  });
  test("test queryDevices returns 2 devices with netlist node n2", () => {
    let data = queryDevicesWithNetlistNode(disposableTops[0].data.id, "n2");
    expect(data.status).toBe(Status.SUCCESS);
    expect(data.data.length).toBe(2);
  });
});

describe("writeJSON", () => {
  beforeAll(() => {
    // populate the memory wth some topologies
    disposableTops.push(readJSON("samples/topology1.json"));
    disposableTops.push(readJSON("samples/topology2.json"));
  });
  afterAll(() => {
    for (let top of disposableTops) {
      deleteTopology(top.data.id);
    }
    disposableTops = [];
  });
  test("test writeJSON returns success", () => {
    let res = writeJSON(disposableTops[0].data.id);
    expect(res.status).toBe(Status.SUCCESS);
    expect(res.data.id).toBe(disposableTops[0].data.id);
  });
});

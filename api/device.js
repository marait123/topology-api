class Device {
  constructor(id, type, netlist) {
    this.id = id;
    this.type = type;
    this.netlist = netlist;
  }
  id = "";
  type = "";
  netlist = [];
}
exports.Device = Device;

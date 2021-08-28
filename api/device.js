/** @class Device representing a Device. */

class Device {
  /**
   * Creates an instance of Result
   *
   * @author: Mohammed Ibrahim Gabllah
   * @param {string} id  this is the id of device
   * @param {string} type the is the device type eg. resistor, nmos, pmos or what
   * @param {Object} netlist this is the object representing the netlist of the device
   */
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

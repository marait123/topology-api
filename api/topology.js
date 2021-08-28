/** @class Topology representing a topology. */
class Topology {
  /**
   * Creates an instance of Result
   *
   * @author: Mohammed Ibrahim Gabllah
   * @param {string} id  this is the id of device
   * @param {Array} components this is the array of devices(components) found in the topoology
   */
  constructor(id, components) {
    this.id = id;
    this.components = components;
  }
  id = "";
  components = [];
}
exports.Topology = Topology;

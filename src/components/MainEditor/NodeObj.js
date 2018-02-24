
export default class NodeObj {
  constructor(id, name, type, x, y, inputs, outputs) {
    this.inputs = inputs
    this.outputs = outputs
    this.x = x
    this.y = y

    this.name = name
    this.id = id
    this.type = type
  }
}

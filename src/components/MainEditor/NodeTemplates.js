import NodeObj from "./NodeObj"
import uuid from "uuid/v4"

let uuid1 = () => uuid().slice(0, 6)


export default function getObject(st) {
  switch (st) {
    case "empty":
      return new NodeObj(uuid1(), "empty", "none", 50, 50, [
        {
          type: "int",
          name: "in1",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "bool",
          name: "in2",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "int",
            name: "out1",
            x: 0,
            y: 0,
            id: null
          },
          {
            type: "bool",
            name: "out2",
            x: 0,
            y: 0,
            id: null
          }
        ])
    case "add":
      return new NodeObj(uuid1(), "Add", "add", 50, 50, [
        {
          type: "int",
          name: "a",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "int",
          name: "b",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "int",
            name: "a+b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "sub":
      return new NodeObj(uuid1(), "Sub", "sub", 50, 50, [
        {
          type: "int",
          name: "a",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "int",
          name: "b",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "int",
            name: "a-b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "mul":
      return new NodeObj(uuid1(), "Mul", "mul", 50, 50, [
        {
          type: "int",
          name: "a",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "int",
          name: "b",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "int",
            name: "a*b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "div":
      return new NodeObj(uuid1(), "Div", "div", 50, 50, [
        {
          type: "int",
          name: "a",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "int",
          name: "b",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "int",
            name: "a/b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "int":
      return new NodeObj(uuid1(), "Int", "int", 50, 50, [], [
          {
            type: "int",
            name: "int",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "bool":
      return new NodeObj(uuid1(), "Bool", "bool", 50, 50, [], [
          {
            type: "bool",
            name: "bool",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
  }
}

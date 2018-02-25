import NodeObj from "./NodeObj"
import uuid from "uuid/v4"

let uuid1 = () => uuid().slice(0, 6)


export default function getObject(st) {
  switch (st) {
    case "switch":
      return new NodeObj(uuid1(), "Switch", "switch", 50, 50, [
        {
          type: "5V",
          name: "5V",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "GND",
          name: "GND",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "pin",
          name: "Pin",
          x: 0,
          y: 0,
          inGroupEditor: true
        }
      ], [
          {
            type: "bool",
            name: "Out",
            x: 0,
            y: 0,
            inGroupEditor: false,
            id: uuid1()
          }
        ])
    case "speaker1":
      return new NodeObj(uuid1(), "Speaker 350", "speaker1", 50, 50, [
        {
          type: "GND",
          name: "GND",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "pin",
          name: "Pin",
          x: 0,
          y: 0,
          inGroupEditor: true,
          speaker: true
        },
        {
          type: "bool",
          name: "On/Off",
          x: 0,
          y: 0
        }
      ], [])
    case "speaker2":
      return new NodeObj(uuid1(), "Speaker 392", "speaker2", 50, 50, [
        {
          type: "GND",
          name: "GND",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "pin",
          name: "Pin",
          x: 0,
          y: 0,
          speaker: true,
          inGroupEditor: true
        },
        {
          type: "bool",
          name: "On/Off",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [])
    case "speaker3":
      return new NodeObj(uuid1(), "Speaker 440", "speaker3", 50, 50, [
        {
          type: "GND",
          name: "GND",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "pin",
          name: "Pin",
          x: 0,
          y: 0,
          speaker: true,
          inGroupEditor: true
        },
        {
          type: "bool",
          name: "On/Off",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [])
    case "speaker4":
      return new NodeObj(uuid1(), "Speaker 494", "speaker4", 50, 50, [
        {
          type: "GND",
          name: "GND",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "pin",
          name: "Pin",
          x: 0,
          y: 0,
          speaker: true,
          inGroupEditor: true
        },
        {
          type: "bool",
          name: "On/Off",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [])
    case "lamp":
      return new NodeObj(uuid1(), "Lamp", "lamp", 50, 50, [
        {
          type: "GND",
          name: "GND",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "pin",
          name: "Pin",
          x: 0,
          y: 0,
          inGroupEditor: true
        },
        {
          type: "bool",
          name: "On/Off",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [])
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
    case "booltrue":
      return new NodeObj(uuid1(), "True", "bool", 50, 50, [], [
        {
          type: "bool",
          name: "true",
          x: 0,
          y: 0,
          payload: true,
          id: uuid1()
        }
      ])
    case "boolfalse":
      return new NodeObj(uuid1(), "False", "bool", 50, 50, [], [
        {
          type: "bool",
          name: "false",
          x: 0,
          y: 0,
          payload: false,
          id: uuid1()
        }
      ])
    case "and":
      return new NodeObj(uuid1(), "AND", "and", 50, 50, [
        {
          type: "bool",
          name: "AND",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "bool",
          name: "",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "bool",
            name: "Out",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "or":
      return new NodeObj(uuid1(), "OR", "or", 50, 50, [
        {
          type: "bool",
          name: "OR",
          x: 0,
          y: 0,
          id: uuid1()
        },
        {
          type: "bool",
          name: "",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "bool",
            name: "Out",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "not":
      return new NodeObj(uuid1(), "NOT", "not", 50, 50, [
        {
          type: "bool",
          name: "In",
          x: 0,
          y: 0,
          id: uuid1()
        }
      ], [
          {
            type: "bool",
            name: "Out",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "gt":
      return new NodeObj(uuid1(), ">", "gt", 50, 50, [
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
            type: "bool",
            name: "a > b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "gte":
      return new NodeObj(uuid1(), ">=", "gte", 50, 50, [
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
            type: "bool",
            name: "a >= b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "lt":
      return new NodeObj(uuid1(), "<", "lt", 50, 50, [
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
            type: "bool",
            name: "a < b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
    case "lte":
      return new NodeObj(uuid1(), "<=", "lte", 50, 50, [
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
            type: "bool",
            name: "a <= b",
            x: 0,
            y: 0,
            id: uuid1()
          }
        ])
  }
}

import stringp from "./StringPresets"


function intersection(arr1, arr2) {
  let arr3 = arr1.filter(function (n) {
    return arr2.indexOf(n) !== -1;
  })
  return arr3.length > 0
}

export default function generate(arr) {
  let executionOrder = []

  arr.forEach(el1 => {
    for (var i = 0; i < executionOrder.length; i++) {
      if (intersection(el1.outputsArr, executionOrder[i].inputsArr)) {
        executionOrder.splice(i, 0, el1)
        return
      }
    }
    executionOrder.push(el1)
  });

  console.log(executionOrder)
  executionOrder.forEach((e, i) => {
    e.i = i
  })


  let str = ""
  str += stringp.start
  return executionOrder
}

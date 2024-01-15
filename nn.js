function makeArray(i) {
  return (new Array(i)).fill(0)
}

function makeMatrix(i, j) {
  const grid = makeArray(i)
  return grid.map(_ => makeArray(j).map(rand))
}

function rand() {
  return (Math.random() - 0.5)
}

function sigmoid(x) {
  return Math.tanh(x)
}

function dsigmoid(x) {
  return 1.0 - x * x
}

function dot(arr, mx) {
  let list = []
  for (let i = 0; i < mx[0].length; i++) {
    let sum = 0
    for (let j = 0; j < arr.length; j++) {
      sum += arr[j] * mx[j][i]
    }
    list.push(sum)
  }
  return list
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]))
}

function updateWeight(weight, arr1, arr2, rate = 0.01) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      let change = arr1[i] * arr2[j]
      weight[i][j] += change * rate
    }
  }
}

let a = 14 * 14
let b = 30
let c = 10
let d = 10

let n1 = makeArray(a)
let n2 = makeArray(b)
let n3 = makeArray(c)
let n4 = makeArray(d)

let w1 = makeMatrix(a, b)
let w2 = makeMatrix(b, c)
let w3 = makeMatrix(c, d)

function update (inputs) {
  n1 = inputs
  n2 = dot(n1, w1).map(sigmoid)
  n3 = dot(n2, w2).map(sigmoid)
  n4 = dot(n3, w3).map(sigmoid)
  return n4
}

function backPropagate (targets, learningRate = 0.001) {
  let e4 = targets.map((t, i) => t - n4[i])
  let n4_diff = n3.map(dsigmoid).map((v, i) => v * e4[i])
  let e3 = dot(n4_diff, transpose(w3))
  let n3_diff = n3.map(dsigmoid).map((v, i) => v * e3[i])
  let e2 = dot(n3_diff, transpose(w2))
  let n2_diff = n2.map(dsigmoid).map((v, i) => v * e2[i])
  updateWeight(w3, n3, n4_diff, learningRate)
  updateWeight(w2, n2, n3_diff, learningRate)
  updateWeight(w1, n1, n2_diff, learningRate)
}
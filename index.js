const dataCanvas = $('#data-canvas')[0]
const dataCtx = dataCanvas.getContext('2d')
const drawCanvas = $('#draw-canvas')[0]
const drawCtx = drawCanvas.getContext('2d')
const markCanvas = $('#mark-canvas')[0]
const markCtx = markCanvas.getContext('2d')
const miniCanvas = $('#mini-canvas')[0]
const miniCtx = markCanvas.getContext('2d')

let cursorX = 0
let cursorY = 0
let isMouseDown = false

$('#draw-canvas').on('mousedown', () => isMouseDown = true)
$('#draw-canvas').on('mouseup', () => isMouseDown = false)
$('#draw-canvas').on('mousemove', (e) => {
  if (!isMouseDown) return
  let rect = drawCanvas.getBoundingClientRect()
  let x = Math.floor((e.clientX - rect.left) / 10)
  let y = Math.floor((e.clientY - rect.top) / 10)
  drawCtx.fillStyle = 'white'
  drawCtx.beginPath()
  drawCtx.arc(x, y, 1, 0, 2 * Math.PI)
  drawCtx.fill()
  test()
  render()
})
$('#mark-canvas').click((e) => {
  let rect = dataCanvas.getBoundingClientRect()
  cursorX = Math.floor((e.clientX - rect.left) / 14)
  cursorY = Math.floor((e.clientY - rect.top) / 14)
  drawCtx.drawImage(dataCanvas, cursorX * 14, cursorY * 14, 14, 14, 0, 0, 14, 14)
  $('#cursor').css({ top: `${cursorY * 14}px`, left: `${cursorX * 14}px` })
})
$('#upload').change(e => {
  let img = new Image()
  img.onload = () => dataCtx.drawImage(img, 0, 0)
  img.src = URL.createObjectURL(e.target.files[0])
})
$('#download').click(e => {
  let image = dataCanvas.toDataURL('image/png')
  image = image.replace('image/png', 'image/octet-stream')
  window.location.href = image
})
$('#saveback').click(() => {
  dataCtx.drawImage(drawCanvas, 0, 0, 14, 14, cursorX * 14, cursorY * 14, 14, 14)
})
$('#clear').click(() => {
  drawCtx.fillStyle = 'black'
  drawCtx.fillRect(0, 0, 14, 14)
})

function test() {
  const arr = []
  miniCtx.drawImage(drawCanvas, 0, 0, 14, 14)
  const data = miniCtx.getImageData(0, 0, 14, 14).data
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i + 0] + data[i + 1] + data[i + 2]) / 3 / 225
    arr.push(avg)
  }
  const result = update(arr)
  const num = result.indexOf(Math.max(...result))
  $('#result').text('辨識結果為:' + num)
}


function getImageData(x, y, width, height) {
  const data = dataCtx.getImageData(x, y, width, height).data
  const list = []
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i + 0] + data[i + 1] + data[i + 2]) / 3 / 225
    list.push(avg)
  }
  return list
}

const chart = new Chart(document.getElementById('chart-canvas'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: '訓練資料通過率', data: [], borderWidth: 1 },
      { label: '測試資料通過率', data: [], borderWidth: 1 },
    ]
  },
  options: {
    scales: { y: { beginAtZero: true, min: 0, max: 100 } },
    animation: { duration: 0 }
  }
})

function addLog(trainRate, testRate) {
  chart.data.labels.push(chart.data.labels.length + 1)
  chart.data.datasets[0].data.push(trainRate)
  chart.data.datasets[1].data.push(testRate)
  chart.update()
}
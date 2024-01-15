function render() {

  const brain = document.querySelector('#brain-canvas')
  const ctx = brain.getContext('2d')
  ctx.clearRect(0, 0, 2400, 600)

  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      const w = w1[i][j]
      const x = i % 14
      const y = Math.floor(i / 14)
      const color = Math.floor(n1[i] * 255)
      ctx.lineWidth = 0.1
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${color}, 0, 0, ${w})`
      ctx.moveTo(x * 40, y * 40)
      ctx.lineTo(300 + 400 + 50, j * 20 + 10)
      ctx.stroke()
    }
  }

  for (let i = 0; i < b; i++) {
    for (let j = 0; j < c; j++) {
      const w = w2[i][j]
      const color = Math.floor(n1[i] * 255)
      ctx.lineWidth = 0.1
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${color}, 0, 0, ${w})`
      ctx.moveTo(300 + 400 + 50, i * 20 + 10)
      ctx.lineTo(300 + 600 + 50, j * 20 + 10)
      ctx.stroke()
    }
  }

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < d; j++) {
      const w = w3[i][j]
      const color = Math.floor(n1[i] * 255)
      ctx.lineWidth = 0.1
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${color}, 0, 0, ${w})`
      ctx.moveTo(300 + 600 + 50, i * 20 + 10)
      ctx.lineTo(300 + 800 + 50, j * 20 + 10)
      ctx.stroke()
    }
  }

  for (let i = 0; i < a; i++) {
    const x = i % 14
    const y = Math.floor(i / 14)
    ctx.fillStyle = `rgba(255, 0, 0, ${n1[i]})`
    ctx.beginPath()
    ctx.arc(x * 40, y * 40, 4, 0, 2 * Math.PI)
    ctx.fill()
  }

  for (let i = 0; i < b; i++) {
    ctx.fillStyle = `rgba(255, 0, 0, ${n2[i]})`
    ctx.beginPath()
    ctx.arc(300 + 400 + 50, i * 20 + 10, 4, 0, 2 * Math.PI)
    ctx.fill()
  }

  for (let i = 0; i < c; i++) {
    ctx.fillStyle = `rgba(255, 0, 0, ${n3[i]})`
    ctx.beginPath()
    ctx.arc(300 + 600 + 50, i * 20 + 10, 4, 0, 2 * Math.PI)
    ctx.fill()
  }

  for (let i = 0; i < d; i++) {
    ctx.fillStyle = `rgba(255, 0, 0, ${n4[i]})`
    ctx.beginPath()
    ctx.arc(300 + 800 + 50, i * 20 + 10, 4, 0, 2 * Math.PI)
    ctx.fill()
  }
}
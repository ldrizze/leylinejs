const expect = require('chai').expect
const io = require('socket.io-client')

describe('Connect to the main driver and send/receive events', () => {
  let port, socket
  
  // Setup connection before tests
  before(() => {
    port = process.env.PORT || '8080'
  })

  it('should connect to the server', done => {
    socket = io(`http://localhost:${port}`)
    socket.on('connection-accepted', () => {
      done()
    })
  })

  it('should to communicate with ping/pong event', done => {
    socket.emit('LLping', 'ping')
    socket.on('LLpong', (data) => {
      expect(data).is.equal('pong')
      done()
    })
  })

  it('should close connection', done => {
    socket.disconnect()
    done()
  })
})
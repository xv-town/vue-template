const networkInterfaces = require('os').networkInterfaces();

exports.getIPAdress = function () {
  let IP;
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address
      }
    })
  })
  return IP;
}

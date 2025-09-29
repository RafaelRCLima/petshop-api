import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // aplica cor em toda a mensagem
    winston.format.printf((info) => {
      return String(info.message);
    })
  ),
  transports: [new winston.transports.Console()]
});

export default logger;

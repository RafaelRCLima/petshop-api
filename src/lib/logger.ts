import winston from 'winston';

const baseLogger = winston.createLogger({
  levels: winston.config.npm.levels,
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }), // aplica cor em toda a mensagem
    winston.format.printf((info) => {
      return String(info.message);
    })
  ),
  transports: [new winston.transports.Console()]
});

const logger = {
  info: (message: string) => baseLogger.info(message),
  warn: (message: string) => baseLogger.warn(message),
  error: (message: string) => baseLogger.error(message)
};

export default logger;

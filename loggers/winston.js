import winston from 'winston';

const buildLogger = () => {
    const log = winston.createLogger({
        transports: [
            new winston.transports.Console({level: 'info'}),
            new winston.transports.File({filename: 'warn.log', level: 'warn'}),
            new winston.transports.File({filename: 'error.log', level: 'error'})
        ]
    });
    return log;
}

const logger = buildLogger();

export default logger;
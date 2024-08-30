import { createLogger, transports, format } from "winston";

// FORMATO DOS LOGS
// TIMESTAMP [level] | NAME_OF_MESSAGE 

const logger = createLogger({
    level: "silly",
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, name, origin, message}) => {
            return `${timestamp}  [${level}] | ${name} ${origin} [${message}]`
        })
    ),

    transports: [
        new transports.File({
            filename: "./Logs/applog-debug.log"
        })
    ]
});

export default logger;
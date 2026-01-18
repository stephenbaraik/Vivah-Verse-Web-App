// Request Logging Middleware
const fs = require('fs');
const path = require('path');

// Log levels
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

// Get log level from environment
const getLogLevel = () => {
  return process.env.LOG_LEVEL || 'info';
};

// Check if we should log at this level
const shouldLog = (level) => {
  const levels = [LOG_LEVELS.ERROR, LOG_LEVELS.WARN, LOG_LEVELS.INFO, LOG_LEVELS.DEBUG];
  const currentLevelIndex = levels.indexOf(getLogLevel());
  const messageLevelIndex = levels.indexOf(level);
  return messageLevelIndex <= currentLevelIndex;
};

// Format timestamp
const formatTimestamp = () => {
  return new Date().toISOString();
};

// Create log entry
const createLogEntry = (level, message, meta = {}) => {
  return {
    timestamp: formatTimestamp(),
    level: level.toUpperCase(),
    message,
    ...meta
  };
};

// Console logger
const consoleLog = (entry) => {
  const { level, message, ...meta } = entry;
  const prefix = `[${entry.timestamp}] [${level.toUpperCase()}]`;
  
  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(prefix, message, meta);
      break;
    case LOG_LEVELS.WARN:
      console.warn(prefix, message, meta);
      break;
    case LOG_LEVELS.DEBUG:
      if (shouldLog(LOG_LEVELS.DEBUG)) {
        console.debug(prefix, message, meta);
      }
      break;
    default:
      console.log(prefix, message, meta);
  }
};

// File logger (optional - for production)
const logDir = process.env.LOG_DIR || './logs';
const enableFileLogging = process.env.ENABLE_FILE_LOGGING === 'true';

if (enableFileLogging && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const fileLog = (entry) => {
  if (!enableFileLogging) return;
  
  const logFile = path.join(logDir, `${new Date().toISOString().split('T')[0]}.log`);
  const logLine = JSON.stringify(entry) + '\n';
  
  fs.appendFileSync(logFile, logLine);
};

// Main logger
const logger = {
  error: (message, meta = {}) => {
    const entry = createLogEntry(LOG_LEVELS.ERROR, message, meta);
    consoleLog(entry);
    fileLog(entry);
  },
  
  warn: (message, meta = {}) => {
    if (!shouldLog(LOG_LEVELS.WARN)) return;
    const entry = createLogEntry(LOG_LEVELS.WARN, message, meta);
    consoleLog(entry);
    fileLog(entry);
  },
  
  info: (message, meta = {}) => {
    if (!shouldLog(LOG_LEVELS.INFO)) return;
    const entry = createLogEntry(LOG_LEVELS.INFO, message, meta);
    consoleLog(entry);
    fileLog(entry);
  },
  
  debug: (message, meta = {}) => {
    if (!shouldLog(LOG_LEVELS.DEBUG)) return;
    const entry = createLogEntry(LOG_LEVELS.DEBUG, message, meta);
    consoleLog(entry);
    fileLog(entry);
  }
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    // Skip health check endpoint logging
    if (req.path === '/health') return;
    
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
  logger.error('Unhandled error', {
    method: req.method,
    path: req.path,
    error: err.message,
    stack: err.stack,
    ip: req.ip
  });
  
  next(err);
};

module.exports = {
  logger,
  requestLogger,
  errorLogger,
  LOG_LEVELS
};


/**
 * internal Logger to be used
 * @private
 */
var log4spLogger = Log4sp.getLogger("Log4sp");
log4spLogger.addAppender(new Log4sp.DeveloperConsoleAppender());
log4spLogger.setLevel(Log4sp.Level.ALL);

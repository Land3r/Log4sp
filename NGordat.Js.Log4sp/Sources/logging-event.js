/**
 * Models a logging event.
 * @constructor
 * @param {String} categoryName name of category
 * @param {Log4sp.Level} level level of message
 * @param {String} message message to log
 * @param {Log4sp.Logger} logger the associated logger
 * @author Seth Chisamore
 */
Log4sp.LoggingEvent = function(categoryName, level, message, exception, logger) {
	/**
	 * the timestamp of the Logging Event
	 * @type Date
	 * @private
	 */
	this.startTime = new Date();
	/**
	 * category of event
	 * @type String
	 * @private
	 */
	this.categoryName = categoryName;
	/**
	 * the logging message
	 * @type String
	 * @private
	 */
	this.message = message;
	/**
	 * the logging exception
	 * @type Exception
	 * @private
	 */
	this.exception = exception;
	/**
	 * level of log
	 * @type Log4sp.Level
	 * @private
	 */
	this.level = level;
	/**
	 * reference to logger
	 * @type Log4sp.Logger
	 * @private
	 */
	this.logger = logger;
};

Log4sp.LoggingEvent.prototype = {	
	/**
	 * get the timestamp formatted as String.
	 * @return {String} formatted timestamp
	 * @see Log4sp#setDateFormat()
	 */
	getFormattedTimestamp: function() {
		if(this.logger) {
			return this.logger.getFormattedTimestamp(this.startTime);
		} else {
			return this.startTime.toGMTString();
		}
	}
};

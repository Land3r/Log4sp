/**
 * Abstract base class for other appenders. 
 * It is doing nothing.
 *
 * @constructor
 * @param {Log4sp.Logger} logger log4sp instance this appender is attached to
 * @author Stephan Strittmatter
 */
Log4sp.Appender = function () {
	/**
	 * Reference to calling logger
	 * @type Log4sp.Logger
	 * @private
	 */
	 this.logger = null;
};

Log4sp.Appender.prototype = {
	/** 
	 * appends the given loggingEvent appender specific
	 * @param {Log4sp.LoggingEvent} loggingEvent loggingEvent to append
	 */
	doAppend: function(loggingEvent) {
		return;
	},
	/** 
	 * clears the Appender
	 */
	doClear: function() {
		return;
	},
	
	/**
	 * Set the Layout for this appender.
	 * @param {Log4sp.Layout} layout Layout for formatting loggingEvent
	 */
	setLayout: function(layout){
		this.layout = layout;
	},
	/**
	 * Set reference to the logger.
	 * @param {Log4sp.Logger} the invoking logger
	 */
	setLogger: function(logger){
		// add listener to the logger methods
		logger.onlog.addListener(Log4sp.bind(this.doAppend, this));
		logger.onclear.addListener(Log4sp.bind(this.doClear, this));
	
		this.logger = logger;
	}
};

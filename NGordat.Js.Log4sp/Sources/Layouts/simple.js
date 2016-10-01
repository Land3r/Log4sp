/**
 * SimpleLayout consists of the level of the log statement, followed by " - " 
 * and then the log message itself. For example,
 * <code>DEBUG - Hello world</code>
 *
 * @constructor
 * @extends Log4sp.Layout
 * @author Stephan Strittmatter
 */
Log4sp.SimpleLayout = function() {
	this.LINE_SEP  = "\n";
	this.LINE_SEP_LEN = 1;
};

Log4sp.SimpleLayout.prototype = Log4sp.extend(new Log4sp.Layout(), /** @lends Log4sp.SimpleLayout# */ {
	/** 
	 * Implement this method to create your own layout format.
	 * @param {Log4sp.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format: function(loggingEvent) {
	    return loggingEvent.level.toString() + " - " + loggingEvent.categoryName + " - " + loggingEvent.message + this.LINE_SEP;
	},
	/** 
	 * Returns the content type output by this layout. 
	 * @return The base class returns "text/plain".
	 * @type String
	 */
	getContentType: function() {
		return "text/plain";
	},
	/** 
	 * @return Returns the header for the layout format. The base class returns null.
	 * @type String
	 */
	getHeader: function() {
		return "";
	},
	/** 
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter: function() {
		return "";
	}
});

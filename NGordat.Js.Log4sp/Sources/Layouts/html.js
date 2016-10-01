/**
 * HtmlLayout write the logs in Html format.
 *
 * @constructor
 * @extends Log4sp.Layout
 * @author Stephan Strittmatter
 */
Log4sp.HtmlLayout = function() {return;};

Log4sp.HtmlLayout.prototype = Log4sp.extend(new Log4sp.Layout(), /** @lends Log4sp.HtmlLayout# */ {
	/** 
	 * Implement this method to create your own layout format.
	 * @param {Log4sp.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format: function(loggingEvent) {
		return "<div style=\"" + this.getStyle(loggingEvent) + "\">" + loggingEvent.getFormattedTimestamp() + " - " + loggingEvent.level.toString() + " - " + loggingEvent.message + "</div>\n";
	},
	/** 
	 * Returns the content type output by this layout. 
	 * @return The base class returns "text/html".
	 * @type String
	 */
	getContentType: function() {
		return "text/html";
	},
	/** 
	 * @return Returns the header for the layout format. The base class returns null.
	 * @type String
	 */
	getHeader: function() {
		return "<html><head><title>log4sp</head><body>";
	},
	/** 
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter: function() {
		return "</body></html>";
	},
	
	getStyle: function(loggingEvent)
	{
		var style;
		if (loggingEvent.level.toString().search(/ERROR/) != -1) { 
			style = 'color:red';
		} else if (loggingEvent.level.toString().search(/FATAL/) != -1) { 
			style = 'color:red';
		} else if (loggingEvent.level.toString().search(/WARN/) != -1) { 
			style = 'color:orange';
		} else if (loggingEvent.level.toString().search(/DEBUG/) != -1) {
			style = 'color:green';
		} else if (loggingEvent.level.toString().search(/INFO/) != -1) {
			style = 'color:white';
		} else {
			style = 'color:yellow';
		}	
		return style;
	}
});

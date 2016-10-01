/**
 * JS Alert Appender writes the logs to the JavaScript alert dialog box
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @author S&eacute;bastien LECACHEUR
 */
Log4sp.JSAlertAppender = function() {

	this.layout = new Log4sp.SimpleLayout();
};

Log4sp.JSAlertAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.JSAlertAppender# */ {
	/** 
	 * @see Log4sp.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		alert(this.layout.getHeader() + this.layout.format(loggingEvent) + this.layout.getFooter());
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4sp.JSAlertAppender"; 
	 }	
});

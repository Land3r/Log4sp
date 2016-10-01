/**
 * Developer Console Appender writes the logs to the Developer console
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @author Nicolas GORDAT
 */
Log4sp.DeveloperConsoleAppender = function () {

    this.layout = new Log4sp.SimpleLayout();
};

Log4sp.DeveloperConsoleAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.JSAlertAppender# */ {
    /** 
	 * @see Log4sp.Appender#doAppend
	 */
    doAppend: function(loggingEvent) {
        window.console.log(this.layout.getHeader() + this.layout.format(loggingEvent) + this.layout.getFooter());
    },

    /** 
	 * toString
	 */
    toString: function () {
        return "Log4sp.DeveloperConsoleAppender";
    }
});
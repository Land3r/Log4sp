/**
 * Sharepoint Appender writes the logs to SharePoint
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @author Nicolas GORDAT
 */
Log4sp.SharepointAppender = function () {

    this.layout = new Log4sp.SimpleLayout();
};

Log4sp.SharepointAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.SharepointAppender# */ {
    /** 
	 * @see Log4sp.Appender#doAppend
	 */
    doAppend: function (loggingEvent) {
        alert(this.layout.getHeader() + this.layout.format(loggingEvent) + this.layout.getFooter());
    },

    /** 
	 * toString
	 */
    toString: function () {
        return "Log4sp.JSAlertAppender";
    }
});

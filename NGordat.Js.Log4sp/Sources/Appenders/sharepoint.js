/**
 * Sharepoint Appender writes the logs to SharePoint
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @param context Sharepoint context against which the errors will be logged
 * @author Nicolas GORDAT
 */
Log4sp.SharepointAppender = function(context) {

    this.layout = new Log4sp.SimpleLayout();

    this.context = context;
};

Log4sp.SharepointAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.SharepointAppender# */ {
    /** 
	 * @see Log4sp.Appender#doAppend
     Note: You should trigger SharePoint Errors only for WARN or ERROR messages.
	 */
    doAppend: function(loggingEvent) {
        this.logToSharepoint(loggingEvent);
    },

    logToSharepoint: function(loggingEvent)
    {
        //var d = jQuery.Deferred();

        var textError = this.layout.getHeader() + this.layout.format(loggingEvent) + this.layout.getFooter()
        SP.Utilities.Utility.logCustomAppError(context, textError);

        var o = {d: d, l: loggingEvent}
        this.context.executeQueryAsync(Function.createDelegate(o, this.logToSharepointOnSuccess), Function.createDelegate(o, this.logToSharepointOnFailure));

        //return d.promise();
    },

    logToSharepointOnSuccess: function()
    {
        // loggingEvent was successfully sent to Sharepoint
        log4spLogger && log4spLogger.trace("< SharepointAppender log successufully received by Sharepoint");

    },

    logToSharepointOnFailure: function()
    {
        // loggigEvent was not successfully sent, redirecting to default logger
        log4spLogger && log4spLogger.error("< SharepointAppender log NOT successufully received by Sharepoint. Logging to default log4spAppender.");
        log4spLogger && log4spLogger.doAppend(this.l);
    },

    /** 
	 * toString
	 */
    toString: function() {
        return "Log4sp.SharepointAppender";
    }
});

/**
 * Appender writes the logs to the JavaScript console of Mozilla browser
 * More infos: http://kb.mozillazine.org/index.php?title=JavaScript_Console&redirect=no
 * PLEASE NOTE - Only works in Mozilla browser
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @author Stephan Strittmatter
 */
Log4sp.MozillaJSConsoleAppender = function() {
	this.layout = new Log4sp.SimpleLayout();
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		this.jsConsole = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
		this.scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
	} catch (e) {
		log4spLogger && log4spLogger.error(e);
	}
};

Log4sp.MozillaJSConsoleAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.MozillaJSConsoleAppender# */ {
	/** 
	 * @see Log4sp.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			this.scriptError.init(this.layout.format(loggingEvent), null, null, null, null, this.getFlag(loggingEvent), loggingEvent.categoryName);
			this.jsConsole.logMessage(this.scriptError);
		} catch (e) {
			log4spLogger && log4spLogger.error(e);
		}
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4sp.MozillaJSConsoleAppender"; 
	 },
	 
	/**
	 * Map Log4sp.Level to jsConsole Flags:
	 * <ul>
	 * <li>nsIScriptError.errorFlag (0) = Level.Error</li>
	 * <li>nsIScriptError.warningFlag (1)= Log4sp.Level.WARN</li>
	 * <li>nsIScriptError.exceptionFlag (2) = Log4sp.Level.FATAL</li>
	 * <li>nsIScriptError.strictFlag (4) = unused</li>
	 * </ul>
	 * @private
	 */	
	getFlag: function(loggingEvent)
	{
		var retval;
		switch (loggingEvent.level) {	
			case Log4sp.Level.FATAL:
				retval = 2;//nsIScriptError.exceptionFlag = 2
				break;
			case Log4sp.Level.ERROR:
				retval = 0;//nsIScriptError.errorFlag
				break;
			case Log4sp.Level.WARN:
				retval = 1;//nsIScriptError.warningFlag = 1
				break;
			default:
				retval = 1;//nsIScriptError.warningFlag = 1
				break;
		}
		
		return retval;		
	}
});

/**
 * Appender writes the logs to the JavaScript console of Opera browser
 * PLEASE NOTE - Only works in Opera browser
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @author Stephan Strittmatter
 */
Log4sp.OperaJSConsoleAppender = function() {
	this.layout = new Log4sp.SimpleLayout();
};

Log4sp.OperaJSConsoleAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.OperaJSConsoleAppender# */ {
	/** 
	 * @see Log4sp.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		opera.postError(this.layout.format(loggingEvent));
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4sp.OperaJSConsoleAppender"; 
	 }
});

/**
 * Appender writes the logs to the JavaScript console of Safari browser
 * PLEASE NOTE - Only works in Safari browser
 * @constructor
 * @extends Log4sp.Appender  
 * @param logger log4sp instance this appender is attached to
 * @author Stephan Strittmatter
 */
Log4sp.SafariJSConsoleAppender = function() {
	this.layout = new Log4sp.SimpleLayout();
};

Log4sp.SafariJSConsoleAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.SafariJSConsoleAppender# */ {
	/** 
	 * @see Log4sp.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		window.console.log(this.layout.format(loggingEvent));
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4sp.SafariJSConsoleAppender"; 
	 }
});

/**
 * JavaScript Console Appender which is browser independent.
 * It checks internally for the current browser and adds delegate to
 * specific JavaScript Console Appender of the browser.
 *
 * @constructor
 * @extends Log4sp.Appender 
 * @author Stephan Strittmatter
 * @since 1.0
 */
Log4sp.BrowserConsoleAppender = function() {
	/**
	 * Delegate for browser specific implementation
	 * @type Log4sp.Appender
	 * @private
	 */
	this.consoleDelegate = null;
	
	if (window.console) {
		this.consoleDelegate = new Log4sp.SafariJSConsoleAppender(); 
	}
    else if (window.opera) {
		this.consoleDelegate = new Log4sp.OperaJSConsoleAppender(); 
	}
	else if(netscape) {
		this.consoleDelegate = new Log4sp.MozillaJSConsoleAppender(); 
	}
    else {
       //@todo
       log4spLogger && log4spLogger.error("Unsupported Browser");
    }
};

Log4sp.BrowserConsoleAppender.prototype = Log4sp.extend(new Log4sp.Appender(), /** @lends Log4sp.BrowserConsoleAppender# */ {
	/** 
	 * @see Log4sp.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		this.consoleDelegate.doAppend(loggingEvent);
	},
	/** 
	 * @see Log4sp.Appender#doClear
	 */
	doClear: function() {
		this.consoleDelegate.doClear();
	},
	/**
	 * @see Log4sp.Appender#setLayout
	 */
	setLayout: function(layout){
		this.consoleDelegate.setLayout(layout);
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4sp.BrowserConsoleAppender: " + this.consoleDelegate.toString(); 
	 }
});

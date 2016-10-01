/** 
 * PatternLayout 
 *
 * @constructor
 * @extends Log4sp.Layout
 * @author Stephan Strittmatter
 */
Log4sp.PatternLayout = function(pattern) {
	if (pattern) {
		this.pattern = pattern;
	} else {
		this.pattern = Log4sp.PatternLayout.DEFAULT_CONVERSION_PATTERN;
	}
};

Log4sp.PatternLayout.TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";
Log4sp.PatternLayout.DEFAULT_CONVERSION_PATTERN = "%m%n";
Log4sp.PatternLayout.ISO8601_DATEFORMAT = "yyyy-MM-dd HH:mm:ss,SSS";
Log4sp.PatternLayout.DATETIME_DATEFORMAT = "dd MMM YYYY HH:mm:ss,SSS";
Log4sp.PatternLayout.ABSOLUTETIME_DATEFORMAT = "HH:mm:ss,SSS";

Log4sp.PatternLayout.prototype = Log4sp.extend(new Log4sp.Layout(), /** @lends Log4sp.PatternLayout# */ {
	/** 
	 * Returns the content type output by this layout. 
	 * @return "text/plain".
	 * @type String
	 */
	getContentType: function() {
		return "text/plain";
	},
	/** 
	 * @return Returns the header for the layout format.
	 * @type String
	 */
	getHeader: function() {
		return null;
	},
	/** 
	 * @return Returns the footer for the layout format.
	 * @type String
	 */
	getFooter: function() {
		return null;
	},
	
	format: function(loggingEvent) {
		var regex = /%(-?[0-9]+)?(\.?[0-9]+)?([cdmnpr%])(\{([^\}]+)\})?|([^%]+)/;
		var formattedString = "";
		var result;
		var searchString = this.pattern;

		// Cannot use regex global flag since it doesn't work in IE5
		while ((result = regex.exec(searchString))) {
			var matchedString = result[0];
			var padding = result[1];
			var truncation = result[2];
			var conversionCharacter = result[3];
			var specifier = result[5];
			var text = result[6];

			// Check if the pattern matched was just normal text
			if (text) {
				formattedString += "" + text;
			} else {
				// Create a raw replacement string based on the conversion
				// character and specifier
				var replacement = "";
				switch(conversionCharacter) {
					case "c":
						var loggerName = loggingEvent.categoryName;
						if (specifier) {
							var precision = parseInt(specifier, 10);
							var loggerNameBits = loggingEvent.categoryName.split(".");
							if (precision >= loggerNameBits.length) {
								replacement = loggerName;
							} else {
								replacement = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
							}
						} else {
							replacement = loggerName;
						}
						break;
					case "d":
						var dateFormat = Log4sp.PatternLayout.ISO8601_DATEFORMAT;
						if (specifier) {
							dateFormat = specifier;
							// Pick up special cases
							if (dateFormat == "ISO8601") {
								dateFormat = Log4sp.PatternLayout.ISO8601_DATEFORMAT;
							} else if (dateFormat == "ABSOLUTE") {
								dateFormat = Log4sp.PatternLayout.ABSOLUTETIME_DATEFORMAT;
							} else if (dateFormat == "DATE") {
								dateFormat = Log4sp.PatternLayout.DATETIME_DATEFORMAT;
							}
						}
						// Format the date
						replacement = (new Log4sp.SimpleDateFormat(dateFormat)).format(loggingEvent.startTime);
						break;
					case "m":
						replacement = loggingEvent.message;
						break;
					case "n":
						replacement = "\n";
						break;
					case "p":
						replacement = loggingEvent.level.toString();
						break;
					case "r":
						replacement = "" + loggingEvent.startTime.toLocaleTimeString(); //TODO: .getDifference(Log4sp.applicationStartDate);
						break;
					case "%":
						replacement = "%";
						break;
					default:
						replacement = matchedString;
						break;
				}
				// Format the replacement according to any padding or
				// truncation specified

				var len;

				// First, truncation
				if (truncation) {
					len = parseInt(truncation.substr(1), 10);
					replacement = replacement.substring(0, len);
				}
				// Next, padding
				if (padding) {
					if (padding.charAt(0) == "-") {
						len = parseInt(padding.substr(1), 10);
						// Right pad with spaces
						while (replacement.length < len) {
							replacement += " ";
						}
					} else {
						len = parseInt(padding, 10);
						// Left pad with spaces
						while (replacement.length < len) {
							replacement = " " + replacement;
						}
					}
				}
				formattedString += replacement;
			}
			searchString = searchString.substr(result.index + result[0].length);
		}
		return formattedString;
	}
});

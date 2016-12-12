//package com.isdc.controller;
//
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.servlet.HandlerMapping;
//
///**
// * All methods annotated with @ExceptionHandler, @InitBinder, and @ModelAttribute in this
// * class will be applied to all @RequestMapping methods.
// */
//@ControllerAdvice
//public class DebugController {
//
//	private static final Logger LOGGER = LoggerFactory.getLogger(DebugController.class);
//
//	/**
//	 * If a SimsException is thrown by this application, the error response should be sent
//	 * as plain text to the client (instead of wrapping it in a generic HTML page). The
//	 * SimsException contains some helpful information for the client and is expected to be
//	 * exposed in the interface (in contrast to unchecked or any other exception).
//	 * The message sent as plain text is picked up by the corresponding error handler in the
//	 * JavaScript/Ajax part of this application, i.e. where the actual request is triggered
//	 * initially. Usually the error message will be shown in a JavaScript popup to the user.
//	 */
//	@ResponseBody
//	@ExceptionHandler(SimsException.class)
//	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//	public String exceptionHandler(final HttpServletRequest request, final SimsException exception) {
//
//		// print the exception message to the log, the detailed stacktrace is not relevant
//		final String message = exception.getLocalizedMessage();
//		LOGGER.error("SimsException was thrown with message: " + message);
//
//		// since always in case of a SimsException a String should be returned, the produces attribute of the request
//		// mapping needs to be removed so that the initial return type of the service is ignored (otherwise in the converter
//		// that will follow, the media type from the request will be considered so the string might be returned as a JSON)
//		request.removeAttribute(HandlerMapping.PRODUCIBLE_MEDIA_TYPES_ATTRIBUTE);
//
//		// return plain error message
//		return message;
//	}
//
////	/**
////	 * Helper method for debugging controller mappings, e.g. to identify "why" a request is considered as bad
////	 * request and rejected by Spring.
////	 */
////	@ExceptionHandler(Exception.class)
////	@ResponseStatus(HttpStatus.BAD_REQUEST)
////	public void handle(final Exception e) {
////		LOGGER.warn("Exception occurred", e);
////	}
//
//}

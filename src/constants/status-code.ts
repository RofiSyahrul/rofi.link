enum StatusCode {
  // SUCCESS
  /**
   * The request has succeeded. The meaning of the success depends on the HTTP method:
   * - GET: The resource has been fetched and is transmitted in the message body.
   * - HEAD: The representation headers are included in the response without any message body.
   * - PUT or POST: The resource describing the result of the action is transmitted
   * in the message body.
   * - TRACE: The message body contains the request message as received by the server.
   */
  OK = 200,
  /**
   * The request has succeeded and a new resource has been created as a result.
   * This is typically the response sent after POST requests, or some PUT requests.
   */
  Created = 201,
  /**
   * The request has been received but not yet acted upon.
   * It is noncommittal, since there is no way in HTTP to later send an asynchronous response
   * indicating the outcome of the request.
   * It is intended for cases where another process or server handles the request,
   * or for batch processing.
   */
  Accepted = 202,
  /**
   * There is no content to send for this request, but the headers may be useful.
   * The user-agent may update its cached headers for this resource with the new ones.
   *
   * The server successfully processed the request, and is not returning any content.
   *
   * For DELETE method: the action has been enacted but
   * the response does not include an entity
   */
  NoContent = 204,

  // CLIENT ERROR
  /**
   * The server could not understand the request due to invalid syntax.
   */
  BadRequest = 400,
  /**
   * Although the HTTP standard specifies "unauthorized", semantically this response means
   * "unauthenticated".
   * That is, the client must authenticate itself to get the requested response.
   */
  Unauthorized = 401,
  /**
   * The client does not have access rights to the content; that is, it is unauthorized,
   * so the server is refusing to give the requested resource.
   * Unlike 401, the client's identity is known to the server.
   */
  Forbidden = 403,
  /**
   * The server can not find the requested resource.
   * It means that the endpoint is valid but the resource itself does not exist.
   * Servers may also send this response instead of 403
   * to hide the existence of a resource from an unauthorized client.
   * This response code is probably the most famous one due to its frequent occurrence on the web.
   */
  NotFound = 404,
  /**
   * The request method is known by the server but is not supported by the target resource.
   */
  MethodNotAllowed = 405,

  // SERVER ERROR
  /**
   * The server has encountered a situation it doesn't know how to handle.
   */
  InternalServerError = 500
}

export default StatusCode;

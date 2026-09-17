/**
 * Route `q` helpers so the search page does not clobber in-flight typing.
 */

/**
 * Apply a route query to the input only when it is not an echo of our last
 * push and not already what the user is typing.
 */
export function shouldApplyRouteQuery(
  routeQ: string,
  inputQ: string,
  lastPushedQ: string,
): boolean {
  return routeQ !== lastPushedQ && routeQ !== inputQ;
}

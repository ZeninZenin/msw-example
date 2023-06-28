import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { STUB_DISHES } from '../../src/mocks/dishes/stubs'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    body: JSON.stringify(STUB_DISHES),
  };
};

export { handler };
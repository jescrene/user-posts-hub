import { setupServer } from 'msw/node';

import { handlers } from './handlers';

/**
 * MSW server that answers the API requests made by the tests.
 * Use `server.use(...)` inside a test to override a handler, e.g. to return an error.
 */
export const server = setupServer(...handlers);

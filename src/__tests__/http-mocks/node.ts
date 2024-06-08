import { setupServer } from "msw/node";

import { handlers } from "./handlers-mock";

export const mockServer = setupServer(...handlers);

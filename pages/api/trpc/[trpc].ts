import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routes/_app';
import { createContext } from '../../../server/context';

export default createNextApiHandler({
  router: appRouter,
  createContext,
});

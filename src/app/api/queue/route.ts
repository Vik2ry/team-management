import express from 'express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import teamQueue from '@/app/queues/teamQueues';

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/api/queues');

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(teamQueue)],
  serverAdapter,
});

const app = express();
app.use(serverAdapter.getRouter());

export default serverAdapter.getRouter();

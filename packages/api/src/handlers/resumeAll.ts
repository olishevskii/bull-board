import { BullBoardRequest, ControllerHandlerReturnType } from '../../typings/app';

async function resumeAll(req: BullBoardRequest): Promise<ControllerHandlerReturnType> {
  const relevantQueues = req.queues.values().filter((queue) => !queue.readOnlyMode);

  for (const queue of relevantQueues) {
    const isPaused = await queue.isPaused();
    if (isPaused) {
      await queue.resume();
    }
  }

  return { status: 200, body: { message: 'All queues resumed' } };
}

export const resumeAllHandler = resumeAll;

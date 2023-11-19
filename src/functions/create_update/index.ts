import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'product',
        cors: {
          origin: '*',
          headers: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
          allowCredentials: false
        }
      }
    },
    {
      http: {
        method: 'put',
        path: 'product',
        cors: {
          origin: '*',
          headers: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
          allowCredentials: false
        }
      }
    }
  ]
}
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'product',
        cors: true
      }
    },
    {
      http: {
        method: 'put',
        path: 'product',
        cors: true
      }
    }
  ]
}
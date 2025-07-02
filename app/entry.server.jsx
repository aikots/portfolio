import { RemixServer } from '@remix-run/react';
import { PassThrough } from 'stream';
import { renderToPipeableStream } from 'react-dom/server';

export default function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let didError = false;
    const { pipe } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          const body = new PassThrough();
          responseHeaders.set('Content-Type', 'text/html');
          resolve(new Response(body, {
            status: responseStatusCode,
            headers: responseHeaders
          }));
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          didError = true;
          console.error(error);
        }
      }
    );
  });
}

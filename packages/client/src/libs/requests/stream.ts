export async function parseJSONReadableStream<T>(response: Promise<Response>): Promise<T> {
    const output = await response.then(res => {
        return parseReadableStream(res)
    });
    return JSON.parse(output);
}

export const parseReadableStream = (res: Response): Promise<string> => {
    const reader = res.body?.getReader();

    const stream = new ReadableStream({
        start(controller) {
            function push() {
                reader?.read().then(({ done, value }) => {
                    if (done) {
                        controller.close();
                        return;
                    }

                    controller.enqueue(value);
                    push();
                });
            }
    
            push();
        },
    });

    return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
}
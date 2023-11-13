const requester = async (method, url, data) => {
    const options = {}
    if (method !== "GET") {
        options.method = method;
        options.headers = {
            'Content-Type': 'application/json'
        }
        if (data) {
            options.body = JSON.stringify(data);
        }
    }

    const request = await fetch(url, options);
    if (!request.ok) {
        throw new Error('Error');
    }
    const response = await request.json();
    return response;

}

export const post = requester.bind(null, "POST");
export const retrieveAccessToken = async (publicToken: string) => {
    const accessTokenRequest = await fetch('http://localhost:5000/GetAccessToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({publicToken})
    });
    
    return await accessTokenRequest.json();
}
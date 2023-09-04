export const retrieveAccessToken = async (publicToken: string) => {
    const accessTokenRequest = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/GetAccessToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({publicToken})
    });
    
    return await accessTokenRequest.json();
}
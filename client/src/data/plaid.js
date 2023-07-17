
export async function getLinkToken() {
    const linkToken = await fetch('http://localhost:5000/GetLinkToken');
    const response = await linkToken.json();
    return response;
}
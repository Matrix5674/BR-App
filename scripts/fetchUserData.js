export async function getUserData(response) {
    const token = await response.user.getIdToken();
    const res = await fetch('http://localhost:4000/user', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    const data = await res.json();
    return data;
}
import { PUBLIC_BUCKET_URL } from '$env/static/public';

export async function uploadToR2(file: File, accessToken: string) {
    const snowflake = calculateSnowflake(file.name);
    const url = `${PUBLIC_BUCKET_URL}/${snowflake}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: file
    });

    if (response.ok) {
        return url;
    }

    console.error('Failed to upload file');
    console.log(`Response status: ${response.status}`);
    return null;
}

function calculateSnowflake(entropy: string) {
    const timestamp = Date.now() - 1695600000000;
    let random = 0;
    for (let i = 0; i < entropy.length; i++) {
        random += entropy.charCodeAt(i);
    }
    random = random % (1 << 22);
    const snowflake = (timestamp << 22) | random;
    return snowflake.toFixed(0);
}

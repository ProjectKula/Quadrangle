import { PUBLIC_BUCKET_URL } from '$env/static/public';

export async function uploadToR2(file: File, accessToken: string): string {
    const snowflake = calculateSnowflake(makeid(10));
    const url = `${PUBLIC_BUCKET_URL}/${snowflake}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        body: file
    });

    if (response.ok) {
        return snowflake;
    }

    console.error('Failed to upload file');
    console.log(`Response status: ${response.status}`);
    return null;
}

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
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

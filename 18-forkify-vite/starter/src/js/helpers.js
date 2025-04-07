import { TIMEOUT_SEC } from "./config";

export const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function(url) {
    try {
        // 1) fetching data
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)])
        const data = await res.json()

        // 2) custom error
        if (!res.ok) throw new Error(`${data.message}. Status: ${res.status}`)

        return data

    } catch(err) {
        throw err
    }
   
}
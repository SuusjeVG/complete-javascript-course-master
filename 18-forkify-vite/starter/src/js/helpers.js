export const getJSON = async function(url) {
    try {
        // 1) fetching data
        const res = await fetch(url)
        const data = await res.json()

        // 2) custom error
        if (!res.ok) throw new Error(`${data.message}. Status: ${res.status}`)

        return data
            
    } catch(err) {
        console.error(err.message, '❌❌' )
    }
   
}
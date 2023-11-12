

const finalURL = "https://wallet-crypto.be/php/";

export async function postRequest(endpoint, data) {


   
    const URL = finalURL + endpoint;
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const responseData = await response.json();  
          
        return responseData;
    } catch (error) {
        console.error(error);
        
    }
    
}

export async function postRequestFile(endpoint, fileData) {
    const URL = finalURL + endpoint;
    console.log(URL);
    const formData = new FormData();
    for (const key in fileData) {
        if (key === 'importFile') {
            const file = fileData[key];
            formData.append('importFile', {
                uri: file.uri,
                type: file.mimeType, // ou 'application/x-sql' si file.mimeType n'est pas disponible
                name: file.name
            });
        } else {
            formData.append(key, fileData[key]);
        }
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erreur serveur: " + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

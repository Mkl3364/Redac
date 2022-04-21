export const convertImageToBase64 = (file: File) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
        if(typeof reader.result === "string") {
            resolve(reader.result.replace(/^.+?;base64,/, ""));
        }
        if(typeof reader.result === null) {
            throw new Error('Aucun fichier en mémoire')
        }
    }
    
    reader.onerror = (error) => reject(error);
})
import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1, // Tamaño máximo en MB
      maxWidthOrHeight: 1024, // Resolución máxima
      useWebWorker: true,
    };

    return await imageCompression(file, options);
  };

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
};
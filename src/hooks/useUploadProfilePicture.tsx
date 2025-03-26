import { useState } from "react";
import { uploadProfilePicture } from "../config/storage";

export const useUploadProfilePicture = () => {
  const [loading, setLoading] = useState(false);

  const upload = async (file: File) => {
    setLoading(true);
    try {
      const photoURL = await uploadProfilePicture(file);
      return photoURL;
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading };
};

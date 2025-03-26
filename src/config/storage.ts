import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

export const uploadProfilePicture = async (file: File) => {
  if (!file) return;

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const storage = getStorage();
  const storageRef = ref(storage, `profile_pictures/${user.uid}`);

  try {
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    await updateProfile(user, { photoURL });
    return photoURL;
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
    throw error;
  }
};

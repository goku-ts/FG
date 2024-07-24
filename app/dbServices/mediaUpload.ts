import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { collection, deleteDoc, doc, } from 'firebase/firestore';
import app from '../firebaseConfig';
import { deleteObject } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { useAppContext } from '../navigation/AppContextProvider';

const storage = getStorage(app);
const db = getFirestore(app);

// export const uploadMediaToStorageBucket = async (
//     uri: string,
//     fileType: 'image' | undefined,
//     fileName: string
// ) => {


//     const storageRef = ref(storage, `media/${fileName}`);

//     try {

//         const response = await fetch(uri);

//         if (!response.ok) {
//             throw new Error(`Failed to fetch file: ${response.statusText}`);
//         }

//         const mediaBlob = await response.blob();
//         const upload = uploadBytesResumable(storageRef, mediaBlob);

//         return new Promise((resolve, reject) => {
//             upload.on(
//                 'state_changed',
//                 (snapshot) => {
//                     console.log(snapshot.bytesTransferred, '/', snapshot.totalBytes);
//                 },
//                 (error) => reject(error),
//                 () => {
//                     getDownloadURL(upload.snapshot.ref)
//                         .then((url) => {

//                             resolve({ fileName, fileUrl: url, fileType });
//                             console.log(url);

//                         })

//                         .catch((error) => reject(error));
//                 }
//             );
//         });
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }


const mediaCollections = collection(db, 'media');

export async function deleteFileFromDB(fileName: string) {

    const mediaStorageRef = ref(storage, `media/${fileName}`);

    return await deleteObject(ref(storage, `${mediaStorageRef}`));


}
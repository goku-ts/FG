import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, query, Timestamp, updateDoc, where, orderBy, } from "firebase/firestore"
import app from "../firebaseConfig"
import { dataType } from "../data"
import { useState } from "react"

const db = getFirestore(app)

const recordsCollection = collection(db, "records")



export async function createRecord(data: any) {



    const dbData = {
        createdAt: Timestamp.now(),
        completedAt: "",
        ...data
    }

    return await addDoc(recordsCollection, dbData)
}

export async function updateRecord(docId: string, data: any) {
    const docRef = doc(recordsCollection, docId)
    return await updateDoc(docRef, data)
}

export async function deleteRecord(docId: string) {
    const docRef = doc(recordsCollection, docId)
    return await deleteDoc(docRef)
}

export async function getRecord(docId: string) {
    const docRef = doc(recordsCollection, docId)
    return await getDoc(docRef)
}

// export async function getAllRecords() {
//     return await getDocs(recordsCollection)
// }

export async function getAllRecords() {
    try {
        const q = query(recordsCollection);
        const querySnapshot = await getDocs(q);
        const records = [];
        querySnapshot.forEach((doc) => {
            records.push({ id: doc.id, ...doc.data() });
        });
        return records.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
        console.error("Error fetching records:", error);
        throw error; // or handle it as appropriate for your app
    }
}

export const getRecentUpdates = async (lastSyncTime) => {
    const updatesCollection = collection(db, 'updates');
    const q = query(
        updatesCollection,
        where('lastUpdated', '>', lastSyncTime),
        orderBy('lastUpdated')
    );

    const querySnapshot = await getDocs(q);
    const newUpdates = [];
    querySnapshot.forEach((doc) => {
        newUpdates.push({ id: doc.id, ...doc.data() });
    });
    return newUpdates;
}


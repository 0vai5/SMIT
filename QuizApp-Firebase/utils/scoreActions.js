import {addDoc, db, collection, query, where, getDocs} from "../firebase.js"

export const createScore = async (data) => {
    try {
        const q = query(collection(db, "scores"), where("userID", "==", data.userID), where("quizID", "==", data.quizID));
        const docRef = await getDocs(q);

        if (docRef.empty) {
            const docRef = await addDoc(collection(db, "scores"), data);
            return docRef;
        } else {
            return;
        }

    } catch (error) {
        alert(error.message)
    }
};

export const getUserScores = async (uid) => {
    try {
        const q = query(collection(db, "scores"), where("userID", "==", uid));
        const response = await getDocs(q);
        const scores = [];
        response.forEach((doc) => {
            scores.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return scores;

    } catch (error) {
        alert(error.message)
    }
};

export const getQuizScores = async () => {
    try {
        const response = await getDocs(collection(db, "scores"));
        const scores = [];
        response.forEach((doc) => {
            scores.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return scores;

    } catch (error) {
        alert(error.message)
    }
};

export const getQuizScoresByQuizID = async (quizID) => {
    try {
        const q = query(collection(db, "scores"), where("quizID", "==", quizID));
        const response = await getDocs(q);
        const scores = [];

        response.forEach((doc) => {
            scores.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return scores;
    } catch (error) {
        alert(error.message)
    }
}
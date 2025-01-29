import { addDoc, collection, db, doc, getDoc, setDoc, updateDoc, getDocs } from "../firebase.js";

export const createQuiz = async (quiz) => {
    try {
        const quizRef = await addDoc(collection(db, "quizzes"), quiz);
        return quizRef;
    } catch (error) {   
        console.log(error);
        alert(error.code);
    }
};

export const toggleAvailability = async (quizId) => {
    try {

        const quizRef = await getDoc(doc(db, "quizzes", quizId));

        if (quizRef.exists()) {
            const response = await updateDoc(doc(db, 'quizzes', quizId), {
                available: !quizRef.data().available
            });

            return response;
        }


    } catch (error) {
        console.log(error);
        alert(error.code);
    }
};

export const getAllQuizzes = async () => {
    try {
        const quizzes = [];

        const querySnapshot = await getDocs(collection(db, "quizzes"));

        querySnapshot.forEach(doc => {
            quizzes.push({ ...doc.data(), id: doc.id });
        });

        return quizzes;


    } catch (error) {
        console.log(error);
        alert(error.code);
    }
};

export const getQuiz = async (quizId) => {
    try {
        const quizRef = await getDoc(doc(db, "quizzes", quizId));

        if (quizRef.exists()) {
            return { ...quizRef.data(), id: quizRef.id };
        }

    } catch (error) {
        console.log(error);
        alert(error.code);
    }
};
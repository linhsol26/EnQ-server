const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper/dist');

//Model
const Question = require('../models/question.model').Question;

const db = admin.firestore();
const collectionName = 'questions';

//Get 1 question
module.exports.getQuestion = (req, res) => {
  const questionId = req.params.questionId;
  firebaseHelper
    .firestore
    .getDocument(db, collectionName, questionId)
    .then(doc => res.status(200).send(doc))
    .catch(err => res.status(400).send(err));
}

//Get questions
module.exports.getQuestions = async (req, res) => {
  let data = [];
  const questionsRef = db.collection('questions');
  await questionsRef.get()
    .then(snapshot => snapshot.forEach(doc => {
      data.push(doc.data());
    }))
    .then(doc => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
}

//Update 1 question
module.exports.updateQuestion = (req, res) => {
  const questionId = req.params.questionId;
  const data = {...new Question(req.body)};
  firebaseHelper
    .firestore
    .updateDocument(db, collectionName, questionId, data)
    .then(doc => res.status(200).send(`Update question ${questionId} sucessfully !!!`))
    .catch(err => res.status(400).send(err));
}

//Post 1 question
module.exports.addQuestion = (req, res) => {
  let data = {...new Question(req.body)};
  firebaseHelper
    .firestore
    .createNewDocument(db, collectionName, data)
    .then(doc => {
      data.id = doc.id;
      firebaseHelper
        .firestore
        .updateDocument(db, collectionName, data.id, data)
        .then(doc => res.status(200).send(`Add Question ${data.id} Successfully !`))
        .catch(err => res.status(400).send(err));
    })
    .catch(err => res.status(400).send(err));
}

//Delete 1 question
module.exports.deleteQuestion = (req, res) => {
  const questionId = req.params.questionId;
  firebaseHelper
    .firestore
    .deleteDocument(db, collectionName, questionId)
    .then(doc => res.status(200).send(`Delete question ${questionId} successfully !!!`))
    .catch(err => res.status(400).send(err));
}
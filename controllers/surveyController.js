const db = require('../models');

function SurveyController() { }

//
//  CREATE METHODS
//

SurveyController.prototype.createSurvey = function (surveyData, cb) {
    db.Survey.create({
        title: surveyData.title,
        active: surveyData.active,
        public: surveyData.public,
        questions: surveyData.questions
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log("Error:", err);
        cb(err);
    });
}

SurveyController.prototype.addQuestionToSurvey = function (surveyId, questionData, cb) {
    db.Survey.updateOne({ _id: surveyId }, {
        $push: { questions: questionData }
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log("Error:", err);
        cb(err);
    })
}

SurveyController.prototype.addChoiceToQuestion = function () {

}

// 
//  READ METHODS
// 

SurveyController.prototype.getSurveyById = function (surveyId, cb) {
    db.Survey.findOne({ _id: surveyId }).then(result => {
        cb(result);
    });
}

// May be redundant: SurveyController.prototype.getQuestionById = function () {}

// 
//  UPDATE METHODS
// 

/**
 * @description Updates the survey name, description, etc. Does NOT update question info
 */

SurveyController.prototype.updateSurveyActive = function (surveyId, setActive, cb) {
    db.Survey.updateOne({ _id: surveyId }, {
        $set: { active: setActive }
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log("Error:", err);
        cb(err);
    })
}

SurveyController.prototype.updateSurveyInfo = function () {

}

SurveyController.prototype.updateQuestionTitle = function () {

}

SurveyController.prototype.updateChoice = function () {

}

// 
//  DELETE METHODS
// 

SurveyController.prototype.deleteSurvey = function () {

}

SurveyController.prototype.deleteQuestion = function () {

}

SurveyController.prototype.deleteChoice = function () {

}

module.exports = SurveyController;

//Testing
const surveyController = new SurveyController();

surveyController.updateSurveyActive("5ff0e18d678ec73878d9b89d", false, result => {
    console.log(result);
});

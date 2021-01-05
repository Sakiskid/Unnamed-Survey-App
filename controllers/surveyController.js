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
    });
}

SurveyController.prototype.updateSurveyPublic = function (surveyId, setPublic, cb) {
    db.Survey.updateOne({ _id: surveyId }, {
        $set: { public: setPublic }
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log("Error:", err);
        cb(err);
    });
}

SurveyController.prototype.updateSurveyTitle = function (surveyId, setTitle, cb) {
    db.Survey.updateOne({ _id: surveyId }, {
        $set: { title: setTitle }
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log("Error:", err);
        cb(err);
    });
}

SurveyController.prototype.updateSurveyQuestions = function (surveyId, questionData, cb) {
    db.Survey.updateOne({ _id: surveyId }, {
        $set: { questions: questionData }
    }).then(result => {
        cb(result);
    }).catch(err => {
        console.log("Error:", err);
        cb(err);
    })
}

// 
//  DELETE METHODS
// 

SurveyController.prototype.deleteSurvey = function (surveyId, cb) {
    db.Survey.deleteOne({
        _id: surveyId
    }).then(result => {
        cb(result);
    }).catch(err => {
        cb(err);
    })
}

SurveyController.prototype.deleteQuestion = function (surveyId, questionId, cb) {
    // db.Survey.updateOne(
    //     { _id: surveyId },
    //     { $pull: { questions: { _id: questionId } } }
    // ).then(result => {
    //     cb(result);
    // }).catch(err => {
    //     console.log("Error:", err);
    //     cb(err);
    // })
    db.Survey.updateOne(
            { _id: surveyId },
            { $pull: { questions: { _id: questionId } } },
            { multi: true }
        ).then(result => {
            console.log("result: ", result);
        }).catch(err => {
            console.log("error: ", err);
        })
}

SurveyController.prototype.deleteChoice = function () {

}

module.exports = SurveyController;

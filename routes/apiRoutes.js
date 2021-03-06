const UserController = require('../controllers/userController');
const SurveyController = require('../controllers/surveyController.js');
const AuthController = require('../controllers/authController');

// Initialize Controller
const userController = new UserController();
const surveyController = new SurveyController();
const authController = new AuthController();

const apiRoutes = (app) => {
    // USER Routes
    app.route("/api/user")
        // Create Users
        .post((req, res) => {
            let user = req.body;

            if (checkIfObjectIsEmpty(user) === false) {
                userController.createUser(req.body, (userResult) => {

                    if (userResult === "Error: Does not meet minimum requirements.") {
                        res.json(userResult);
                    }
                    else {
                        authController.validatePasswordToken(user.password, userResult, authResult => {
                            res.json({
                                token: authResult,
                                user: userResult
                            });
                        });
                    }

                });
            } else {
                console.log("API ERROR: Attempted to create user but object was empty.");
                res.send("Error: object empty");
            }
        })
        // Get Users
        .get((req, res) => {
            // Only allow one query at a time:
            if (Object.keys(req.query).length > 1) {
                res.send("Error! Only one query is allowed at a time.");
                return;
            }

            // AUTHORIZATION
            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                // Define request query parameters
                let userId = authorization.userId;

                userController.getUserById(userId, (user) => {
                    res.json(user);
                });
            });
        })
        // Update Users
        .put((req, res) => {
            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                // Update values
                let userId = authorization.userId;
                let username = req.body.username;
                let email = req.body.email;
                let password = req.body.password;

                if (username) {
                    userController.updateUsername(userId, username, result => {
                        res.json(result);
                    });
                }
                else if (email) {
                    userController.updateUserEmail(userId, email, result => {
                        res.json(result);
                    });
                }
                else if (password) {
                    userController.updateUserPassword(userId, password, result => {
                        res.json(result);
                    });
                }
            })
        })
        // Delete Users
        .delete((req, res) => {
            // Only allow one query at a time:
            if (Object.keys(req.query).length > 1) {
                res.send("Error! Only one query is allowed at a time.");
                return;
            }

            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                let userId = authorization.userId;

                // Delete user by ID
                userController.deleteUserById(userId, (result) => {
                    res.send(result);
                });
            });
        });

    // AUTHORIZATION Routes
    app.route("/api/auth")
        .post((req, res) => {

            // Get existing variables based on request
            let username = req.body.username
            let password = req.body.password;

            if (username && password) {
                userController.getUserByUsername(username, user => {

                    if (!user) {
                        res.send("Error: Incorrect Username or Password.");
                    }
                    else {
                        authController.validatePasswordToken(password, user, result => {
                            (result === "Error: Incorrect Username or Password.") ? res.send(result) : res.json({ token: result, user: user });
                        });
                    }

                });
            }
        });

    // SURVEY Routes
    app.route("/api/survey")
        // Create a survey
        .post((req, res) => {
            // AUTHORIZATION
            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                let surveyData = req.body.surveyData;
                let userId = authorization.userId;

                surveyController.createSurvey(surveyData, survey => {
                    if (!survey.errors) {
                        userController.addSurveyToUser(userId, survey._id, result => {
                            res.json(survey);
                        });
                    }
                    else {
                        res.json(survey);
                    }
                });
            });
        })
        // Read a survey
        .get((req, res) => {
            // AUTHORIZATION
            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                // define query parameters
                let surveyId = req.query.id;
                let userId = authorization.userId;

                if (surveyId) {
                    // Get one user survey by id
                    surveyController.getSurveyById(surveyId, result => {
                        res.json(result);
                    });
                } else {
                    // Get all user surveys
                    userController.getUserByIdPopulated(userId, result => {
                        res.json(result.surveys);
                    });
                }
            });
        })
        // Update a survey
        .put((req, res) => {
            // AUTHORIZATION
            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                // Define Parameters
                let surveyId = req.body.surveyId;
                let active = req.body.active;
                let public = req.body.public;
                let title = req.body.title;
                let questionData = req.body.questionData;
                let newQuestion = req.body.newQuestion;

                if (active === true || active === false) {
                    // Update Active
                    surveyController.updateSurveyActive(surveyId, active, result => {
                        console.log(result);
                    });
                }
                if (public === true || public === false) {
                    // Update Public
                    surveyController.updateSurveyPublic(surveyId, public, result => {
                        console.log(result);
                    });
                }
                if (title) {
                    // Update Title
                    surveyController.updateSurveyTitle(surveyId, title, result => {
                        console.log(result);
                    });
                }
                if (questionData) {
                    surveyController.updateSurveyQuestions(surveyId, questionData, result => {
                        console.log(result);
                    });
                }
                if (newQuestion) {
                    surveyController.addQuestionToSurvey(surveyId, newQuestion, result => {
                        console.log(result);
                    });
                }

                res.send('done');
            });
        })
        // Delete a survey
        .delete((req, res) => {
            // AUTHORIZATION
            authorizeRequest(req, authorization => {
                if (authorization === 'Error: Authorization is Unsuccessful.') {
                    res.send("Error! User is not authorized.");
                    return;
                }

                let surveyId = req.query.surveyId;
                let userId = authorization.userId;

                surveyController.deleteSurvey(surveyId, result => {
                });

                // NEED TO REMOVE SURVEY FROM USER
            });
        });

    app.route("/api/taking_survey")
        // Read survey
        .get((req, res) => {
            let surveyId = req.query.surveyId;

            surveyController.getSurveyById(surveyId, result => {
                res.json(result);
            });
        })
        // Update a survey
        .put((req, res) => {
            let surveyId = req.query.surveyId;
            let questionId = req.body.questionId;
            let choiceId = req.body.choiceId;

            surveyController.updateSurveyChoiceVote(surveyId, questionId, choiceId, result => {
                res.json(result);
            });
        });

    // Return decrypted authorization if authorized
    function authorizeRequest(request, cb) {
        const authHeader = request.headers.authorization;

        // If no authorization, unauthorized
        if (!authHeader) { cb("Error! User is not authorized."); }

        let token = authHeader.split(' ')[1];
        authController.verifyAuthSignature(token, authorization => {
            cb(authorization);
        });
    }

    function checkIfObjectIsEmpty(obj) {
        // Check if the req.query object is empty!
        if (Object.keys(obj).length === 0) return true;
        else return false;
    }
}

module.exports = apiRoutes;
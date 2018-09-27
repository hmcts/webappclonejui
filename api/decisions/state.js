const express = require('express');
const config = require('../../config');
const stateMeta = require('./state_meta');

function handleStateGetRoute(req, res, next) {
    const caseId = req.params.case_id;
    const response = {};
    let responseStatusCode = 200;

    let inRoute = req.params.state_id;

    if (stateMeta.pages[inRoute]) {
        response.meta = stateMeta.pages[inRoute].uiControls;
        response.formValues = {
            partiesNeedAttend: true
        };
        response.route = 'reject-reasons';    
    } else {
        responseStatusCode = 404;
        response.statusHint = 'Input parameter route_id: uknown route_id';
    }

    res.status(responseStatusCode).send(JSON.stringify(response));
};

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    router.get('/state/:case_id', handleStateGetRoute);
    router.get('/state/:case_id/:state_id', handleStateGetRoute);
    //router.post('/state/:case_id', handleStatePostRoute);
}

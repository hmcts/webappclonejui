const express = require('express');
const config = require('../../config');

function handleStateRoute(req, res, next) {
    const caseId = req.params.case_id;
    const response = {status:"ok"};

    console.log(req.body);

    res.status(200).send(JSON.stringify(response));
};

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    router.post('/state/:case_id', handleStateRoute);
}

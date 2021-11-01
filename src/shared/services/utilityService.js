import {bus} from '../../bus'
var jp = require('jsonpath');
let requests = [];


function getDataUsingJsonPath(object, jsonPathExpression) {
    if (!jsonPathExpression) {
        return '';
    }
    const result = jp.query(object, jsonPathExpression.replace('${language}', 'english'));
    return result.length ? result[0] : '';
}

function addRequest(url) {
    requests.push(url);
    getSpinner();
}

function removeRequest(req) {
    const i = requests.indexOf(req);
    if (i >= 0) {
        requests.splice(i, 1);
    }
    getSpinner();
}

function getSpinner() {
    bus.$emit('fireMethod', requests.length);
}


export {
    getDataUsingJsonPath,
    addRequest,
    removeRequest
}
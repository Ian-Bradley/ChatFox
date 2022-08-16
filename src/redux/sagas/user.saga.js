import { call, out, takeEvery } from 'redux-saga/effects';
import { SERVER_URL } from '../../util/constants.js';
import axios from 'axios';
// /api/user/:name
function* workGetUserFetch() {
    const user = yield
}

function* userSaga() {
    console.log('===> START - userSaga');
    yield takeEvery('user/getUserFetch', workGetUserFetch);
    console.log('===> END - userSaga');
}

import { getMessagesSuccess, getMessagesFailure } from '../slices/messages.slice';
import { call, put, takeEvery } from 'redux-saga/effects';
import api from 'Util/api/axios.js';

function* workGetMessages() {
    try {
        const messages = yield call(() => api.get(`/messages/${1}`));
        console.log(messages);
        yield put(getMessagesSuccess(messages));
    } catch (err) {
        yield put(getMessagesFailure());
        console.error(err);
    }
}

function* messagesSaga() {
    console.log('===> START - userSaga');
    yield takeEvery('messages/getMessages', workGetMessages);
    console.log('===> END - userSaga');
}

export default messagesSaga;

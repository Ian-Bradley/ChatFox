import { getMessagesSuccess, getMessagesFailure } from '../slices/messages.slice';
import { call, put, takeEvery } from 'redux-saga/effects';
import api from 'Util/api/axios.js';

function* workGetMessages(channelID) {
    try {
        const results = yield call(() => api.get(`/messages/${channelID.payload}`));
        yield put(getMessagesSuccess(results.data));
    } catch (err) {
        yield put(getMessagesFailure());
        console.error(err);
    }
}

function* messagesSaga() {
    console.log('===> START - messagesSaga');
    yield takeEvery('messages/getMessages', workGetMessages);
    console.log('===> END - messagesSaga');
}

export default messagesSaga;

import { combineReducers } from 'redux';
import {reducer as eventsReducer} from './eventsSlice.ts'
import {reducer as clientSettingReducer} from './clientSettingSlice.ts'

export const rootReducer = combineReducers({
    events: eventsReducer,
    clientSetting: clientSettingReducer
});
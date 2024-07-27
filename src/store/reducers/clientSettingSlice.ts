import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ClientSetting} from "../../entities/clientSetting.ts";

export type ClientSettingState = {
    setting: ClientSetting | null
}
const initialState: ClientSettingState = { setting: null };

const clientSettingSlice = createSlice({
    name: 'clientSetting',
    initialState,
    reducers: {
        addSettings(state, action: PayloadAction<ClientSetting>) {
            state.setting = action.payload
        },
        updateSetting(state, action: PayloadAction<ClientSetting>) {
            state.setting = {
                ...state.setting,
                ...action.payload
            }
        }
    }
})

export const { addSettings, updateSetting } =
    clientSettingSlice.actions;

export const reducer = clientSettingSlice.reducer;
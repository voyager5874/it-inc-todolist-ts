import {appReducer, EntityStatusType, AppStateType, setAppErrorAC, setAppStatusAC} from "../state/reducers/appReducer";


let startState: IniAppStateType;

beforeEach(() => {
    let startState = {
        status:"idle",
        error: null,
    };
});

test('proper error should be set', () => {
    let err: string | null = 'server error, code 500'
    const endState = appReducer(startState, setAppErrorAC(err))
    expect(endState.error).toBe(err)
})

test('the status should be set', () => {
    let status: EntityStatusType = "failed"
    const endState = appReducer(startState, setAppStatusAC(status))
    expect(endState.status).toBe(status)
})
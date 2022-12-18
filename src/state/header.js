import {createGlobalState} from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
    headerTitle: ""
});

export {setGlobalState, useGlobalState};
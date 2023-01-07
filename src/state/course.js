import {createGlobalState} from "react-hooks-global-state";

const {setCourseIdState, useCourseIdState} = createGlobalState({
    courseId: ""
});

export {setCourseIdState, useCourseIdState};
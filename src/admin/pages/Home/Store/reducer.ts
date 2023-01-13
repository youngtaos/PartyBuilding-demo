import { original, produce } from 'immer';
import { CHANGE_PeopleInfo, CHANGE_SCHEMA } from './constant';

const initialSchema = [{
    "academy": "",
    "content": "",
    "id": 0,
    "imgSrc": "",
    "message": "",
    "people": "",
    "title": "",
}];

const defaultState = {
    schema: initialSchema,
    peopleInfo: [{
        "id": 0,
        "name": "",
        "articleNum": 0
    }]
}

export const HomeMangeReducer = (state = defaultState, action: any) => produce(state, (draft) => {
    switch (action.type) {
        case CHANGE_SCHEMA:
            draft.schema = action.value;
            break;
        case CHANGE_PeopleInfo:
            draft.peopleInfo = action.value;
            break;
        default:
            break;
    }
});



import { original, produce } from 'immer';
import { Add_People, CHANGE_PeopleInfo, CHANGE_SiteSpiderData, CHANGE_SCHEMA, Delete_People, Update_People, CHANGE_WxSpiderData } from './constant';

type schemaType = {
    academy: string,
    content: string,
    id: number,
    imgSrc: string,
    message: string,
    people: [],
    title: string,
}

type SiteSpiderData = {
    academy: string,
    content: string,
    id: number,
    imgSrc: string,
    message: string,
    people: [],
    title: string,
}
type WxSpiderData = {
    academy: string,
    content: string,
    id: number,
    imgSrc: string,
    message: string,
    people: [],
    title: string,
}
const initialSiteSpiderData: SiteSpiderData[] = [];
const initialWxSpiderData: WxSpiderData[] = [];
const initialSchema: schemaType[] = [];
const defaultState = {
    schema: initialSchema,
    peopleInfo: [{
        "id": 0,
        "name": "",
        "articleNum": 0
    }],
    SiteSpiderData: initialSiteSpiderData,
    WxSpiderData: initialWxSpiderData,
}

export const HomeMangeReducer = (state = defaultState, action: any) => produce(state, (draft) => {
    switch (action.type) {
        case CHANGE_SCHEMA:
            draft.schema = action.value;
            break;
        case CHANGE_SiteSpiderData:
            draft.SiteSpiderData = action.value;
            break;
        case CHANGE_WxSpiderData:
            draft.WxSpiderData = action.value;
            break;
        case CHANGE_PeopleInfo:
            draft.peopleInfo = action.value;
            break;
        case Delete_People:
            draft.peopleInfo.splice(action.id, 1);
            break;
        case Add_People:
            draft.peopleInfo = [...draft.peopleInfo, action.value];
            break;
        case Update_People:
            draft.peopleInfo.splice(action.index, 1, action.value);
            break;
        default:
            break;
    }
});



import { CHANGE_SCHEMA, CHANGE_PeopleInfo } from './constant';

export const getChangeSchemaAction = (schema: any) => {
    return {
        type: CHANGE_SCHEMA,
        value: schema
    }
};

export const changePeopleInfoAction = (data: any) => {
    return {
        type: CHANGE_PeopleInfo,
        value: data
    }
}
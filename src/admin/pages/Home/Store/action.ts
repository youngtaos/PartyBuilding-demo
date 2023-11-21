import { PeopleInfoType } from '../components/PeopleManage';
import { CHANGE_SCHEMA, CHANGE_PeopleInfo, Delete_People, Add_People, Update_People } from './constant';

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

export const DeletePeopleAcion = (id: number) => {
    return {
        type: Delete_People,
        id
    }
}

export const addPeopleAction = (value: PeopleInfoType) => {
    return {
        type: Add_People,
        value
    }
}

export const updatePeopleAction = (index: number, value: PeopleInfoType) => {
    return {
        type: Update_People,
        value,
        index
    }
}
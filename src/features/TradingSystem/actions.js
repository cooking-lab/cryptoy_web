import {createAction} from '@reduxjs/toolkit';

export const getToys = createAction('GET-_TOYS', filter => {
    filter ? {payload : {params : {...filter}}} : {}
});

export const getToysSuccess = createAction('GET_TOYS_SUCCESS');
export const getToysError = createAction('GET_TOYS_ERROR');

export const getToy = createAction('GET_TOY', id => ({payload : {id}}));
export const getToySuccess = createAction('GET_TOY_SUCCESS');
export const getToyError = createAction('GET_TOY_ERROR');

export const getOwnerToy = createAction('GET_OWNER_TOY', ownerId => ({payload : {ownerId}}));
export const getOwnerToySuccess = createAction('GET_OWNER_TOY_SUCCESS');
export const getOwnerToyError = createAction('GET_OWNER_TOY_ERROR');

export const registerToy = createAction('REGISTER_TOY', id => ({payload : {id}}));
export const registerToySuccess = createAction('REGISTER_TOY_SUCCESS');
export const registerToyError = createAction('REGISTER_TOY_ERROR');
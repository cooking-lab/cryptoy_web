import { createAction } from "@reduxjs/toolkit";

export const getToys = createAction("GET_TOYS", filters => 
    filters ? {payload : {params : {...filters}}} : {}    
);

export const getToy = createAction("GET_TOY", id => ({payload : {id}}));

export const registToyMarket = createAction("REGISTER_TOY_MARKET", toy => ({
    payload : {data : {...toy}}
}));

export const updateToy = createAction("UPDATE_TOY", (id, toy) => ({
    payload : {id, data : toy}
}));
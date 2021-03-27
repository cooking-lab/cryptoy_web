import * as toys from "../features/TradingSystem/actions";

export default {
    getToys : {
        url : '/toys',
        actions : [toys.getToys, toys.getToysSuccess, toys.getTodosError]
    },
    getToy : {
        url : '/toys/:id',
        actions : [toys.getToy, toys.getToySuccess, toys.getToyError]
    },
    getOwnerToy : {
        url : '/toys/owner/:ownerId',
        actions : [toys.getOwnerToy, toys.getOwnerToySuccess, toys.getOwnerToyError]
    },
    registerToy : {
        url : '/toys/register',
        actions : [toys.registerToy, toys.registerToySuccess, toys.registerToyError]
    }
}
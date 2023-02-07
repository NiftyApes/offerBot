import {offerBot} from './src/main/offerBot.js';

export const handler = async (event) => {
    await offerBot(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
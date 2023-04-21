import {bot} from './src/main/bot.js';

export const handler = async (event) => {
    await bot(event);
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
import {hideBin} from "yargs/helpers";
import Yargs from "yargs";
import {bot} from './main/bot.js';

const yargs = Yargs(hideBin(process.argv))
    .command('seize-and-sell')
    .option('makerAddress', {
        alias: 'maker',
        type: 'string',
        demandOption: true,
        requireArg: true,
        description: 'Address of the maker contract'
    })
    .option('chainId', {
        type: 'string',
        demandOption: true,
        requiresArg: true,
        description: 'Chain Id of the network'
    })
    .option('runInLoop', {
        type: 'boolean',
        requiresArg: false,
        default: false,
        description: 'Run bot indefinetly'
    })
    .option('triggerDelay', {
        type: 'string',
        requiresArg: false,
        default: false,
        description: 'Bot trigger delay in minutes'
    })
;

function exitHandler() {
    console.log(new Date(), 'Exit handler called', arguments);
    process.exit();
}

await bot(yargs.argv);

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

process.exit();
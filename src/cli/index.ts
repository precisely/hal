#!/usr/bin/env node
import {load} from 'js-yaml';
import {HALConsole } from './halConsole';
import {readFileSync} from 'fs';

export function run() {
  const file = process.argv[2];

  if (!file) {
    console.log('usage: hal {dialog.yml}');
  } else {
    console.log(`Starting HAL with ${file}`);
    const hal = new HALConsole();
    const fileContents = readFileSync(file).toString();
    const parsed = load(fileContents);
    hal.start(parsed);
  }
}


// require('yargs')
//     .command('serve', "Start the server.", (yargs: Argv) => {
//         yargs.option('port', {
//             describe: "Port to bind on",
//             default: "5000",
//         }).option('verbose', {
//             alias: 'v',
//             default: false,
//         })
//     }, (args: any) => {
//         if (args.verbose) {
//             console.info("Starting the server...");
//         }
//         serve(args.port);
//     }).argv;

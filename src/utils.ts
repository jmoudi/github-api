import { apFirst } from 'fp-ts-routing';
//import { toLowerCase } from '@std/string';


import {Yaml} from '@encoding/yaml';
import {readFile} from '@std/fs';
import {find} from '@std/fp';
import { array } from 'fp-ts/lib/Array';
import { task } from 'fp-ts/lib/Task';

export const runParallel = array.traverse(task);

/* export const createID = () => Date.now() + Math.floor(100000*Math.random());

export const toChar = (code: number) => String.fromCharCode.call(null, code);


export const toLowerCase = (k: string) => String.prototype.toLowerCase.call(k);
 */


 
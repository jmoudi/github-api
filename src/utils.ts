import { apFirst } from 'fp-ts-routing';
//import { toLowerCase } from '@std/string';

import { config } from '@/constants';
import {Yaml} from '@encoding/yaml';
import {readFile} from '@std/fs';
import {find} from '@std/fp';

/* export const createID = () => Date.now() + Math.floor(100000*Math.random());

export const toChar = (code: number) => String.fromCharCode.call(null, code);


export const toLowerCase = (k: string) => String.prototype.toLowerCase.call(k);
 */


 
export const loadConfig = async () => {
    const searchPaths = [
        "conf.yml"
    ];
    const str = await readFile(find(searchPaths), 'utf-8'); //.then(s => s.match(re));
    return Yaml.parse(str);
 }

  

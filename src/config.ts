import { config } from '@/constants';
import {Yaml} from '@encoding/yaml';
import {readFile} from '@std/fs';

 
interface GithubApiConfig {
    credentials: {
        user: string
        password: string
    }
}
export const loadConfig = async (opts?) => {
    const ma = await readFile(config.keymap, 'utf-8'); //.then(s => s.match(re));
    const conf: GithubApiConfig = await Yaml.parse(ma);
    return conf;


    
 }
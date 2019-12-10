
import {Yaml} from '@encoding/yaml';
import {readFile} from '@std/fs';
import {find} from '@std/fp';

 
export interface Credentials {
    username: string
    password: string
    token: string
}

export interface GithubApiConfig {
    credentials: {
        username: string
        password: string
        token: string
    }

}
export const loadConfig = async () => {
    const searchPaths = [
        "conf.yml"
    ];
    const str = await readFile(find(searchPaths), 'utf-8'); //.then(s => s.match(re));
    return Yaml.parse(str);
 }
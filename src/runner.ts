import GitHub from 'github-api';
import { loadConfig, GithubApiConfig } from '@/config';

//import {axios} from '@std/net';
import {default as axios, AxiosInstance} from 'axios';
import {array} from 'fp-ts/lib/Array';
import {task, Task,of} from 'fp-ts/lib/Task';
import {taskEither,taskify} from 'fp-ts/lib/TaskEither';

import { Lazy } from "fp-ts/lib/function";
import { Either, left, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { TaskEither } from "fp-ts/lib/TaskEither";

import {writeFileAtomic,rename} from "@std/fs";
import {merge,mergeAll,mergeRight,mergeDeepWith, mergeDeep, mergeWith,pickBy,omit,omitBy} from "@std/fp";


import { GithubApi } from './github-api';


 

// doesn't need a ctx to ensure it is JS global scope
export const initContext = <T extends Context>(ctx?: T): Context =>  {
    const newContext = {
        instance: null,
        debug: process.env['development'],
        env: process.env

    };
    return Object.assign({} as Context, newContext);
    //ctx = newContext as any;
}
export const getContext = <T extends Context>(ctx?: T): T =>  {
    if (!ctx){
        initContext();
    }
    return ctx
}

export let instance: AxiosInstance = {} as never;

//export const ctx: Context = initContext();


const createEndpointBase = (config: GithubApiConfig) => {
    return axios.create({
        baseURL: "https://api.github.com",
        auth:{
            username: config.credentials.username,
            password: config.credentials.password
        },
        headers: {
            "Authorization": `Bearer ${config.credentials.token}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
     });
}

 

export const onErr = (err) => console.error(err);


export const init = async() => {
    const config = await loadConfig();
    console.log(`config`, config);
    instance = createEndpointBase(config);
    const app = new GithubApi(config);
    return app
} 

export const run = async() => {
    const app = await init();
    const self = await app.getSelf()
    
    return self
} 



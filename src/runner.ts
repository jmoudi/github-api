import GitHub from 'github-api';
import { loadConfig, GithubApiConfig } from '@/config';
import { fromNodeFunction,fromFunction} from '@std/async';
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

//import Github from '@octokit/rest';

//Github().
 

interface Context {
    instance: AxiosInstance;
    debug: boolean;
    env: object
}

export const ctx: Context = {} as any;

// doesn't need a ctx to ensure it is JS global scope
export const initContext = <T extends Context>(ctx?: T): void =>  {
    const newContext = {
        instance: null,
        debug: process.env['development'],
        env: process.env

    };
    Object.assign(ctx, newContext);
    //ctx = newContext as any;
}
export const getContext = <T extends Context>(ctx?: T): T =>  {
    if (!ctx){
        ctx = {} as any;
        initContext();
    }
    return ctx
}



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
    ctx.instance = createEndpointBase(config);
    const app = new GithubApi(config);
    return app
} 
 
 




export const run = async() => {
    const app = await init();
    const self = await app.getSelf()
    //console.log(`self`, self);
/*     const repos = await app.getRepos()
    .then(filterRepos);
    //console.log(`Repos`, repos);
 */
/*     const showReposTask = (opts?) => () => app.getRepos().then(filterRepos)
    const runner1 = {
        run: showReposTask()
    }
    const deleteRepoTask = (r: Repo) => () => app.deleteRepo(r.name)
    const runner2 = {
        run: runParallel(repos, deleteRepoTask)
    }
    const r = await runner1.run();
    console.log(`r`, r); */

    /* 
    const repos = await app.listRepos({}, handleR);
    console.log(`repos`, repos); */
    return self
} 



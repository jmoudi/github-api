/// <reference path="../src/types.d.ts" />

import { init, GithubApi } from './../src';
import { runParallel } from './../src/utils';


const log = console.log



let app: GithubApi;
beforeAll(async (done) => {
    app = await init();
    const self = await app.getSelf()
    log(`s`, self);
    done();
});
 
afterAll(async (done) => {

    done();
});




describe('app', () => {
    test('app', async () => {
        expect(app).toBeDefined();
        
    });
    test('tasks', async () => {
        const filterRepos = (repos: Repo[]) => {
            return repos.filter(r => r.fork); //.map(r => r.name)//.filter();
        }

        const showReposTask = (opts?) => () => app.getRepos().then(filterRepos)
        const runner1 = {
            run: showReposTask()
        }
        const repos = await runner1.run();


        const deleteRepoTask = (r: Repo) => () => app.deleteRepo(r.name)
        const runner2 = {
            run: runParallel(repos, deleteRepoTask)
        }
        const state = await runner2.run();
        expect(state).toBeDefined();
        
    });
    
});
 

/* 
export const init = async() => {
    const config = await loadConfig();
    console.log(`config`, config);

    const res = await axios.request({
        baseURL: "https://api.github.com",
        url: `users/jmoudi/repos`,
        auth:{
            username: config.credentials.username,
            password: config.credentials.password
        },
        headers: {
            Authorization: `Bearer ${config.credentials.token}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
     });
     console.log(`fsd`, res.status, res.data)
     //const r: any = await gh.get("/user/repos", {data: {"scopes":["public_repo"]}})
     //console.log(`gh`, gh, r);

     
     const app = {
        //gh
     };
     return app
 

}  */
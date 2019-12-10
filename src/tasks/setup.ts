import { runParallel } from '@/utils';
import { init } from '@/runner';

export const run = async() => {
    const repos = [
        {name:"ts-std-fp"},
        {name:"browser-tab-utils"},
        {name:"x-paste"},
        {name:"shortcut-manager"},
        {name:"github-api"}
    ];
    const app = await init();
    const self = await app.getSelf()
        const createRepoTask = (r: Repo) => () => app.createRepo(r)
        const runner2 = {
            run: runParallel(repos, createRepoTask)
        }
        const state = await runner2.run();
        console.log(`state`, state);
        return self
    } 
    
    
    
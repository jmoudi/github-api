import GitHub from 'github-api';
import { loadConfig } from '@/config';
import { fromNodeFunction} from '@std/async';

//import Github from '@octokit/rest';

//Github().
 interface Repo {

 }

 class App {
     constructor(){

     }
 }

export const init = async() => {
    const config = await loadConfig();
    const gh = new GitHub({
        username: config.credentials.user,
        password: config.credentials.password
        /* also acceptable:
           token: 'MY_OAUTH_TOKEN'
         */
     });
     const jm = gh.getUser(config.credentials.user);
     const listRepos = fromNodeFunction<Repo[]>(jm.listRepos);
     console.log(`jm`, jm);

     const app = {
        listRepos
     };
     return app
 /*    jm.listRepos(function(err, repos) {
    // look at all the starred repos!
    }); */

} 

 


export const run = async() => {
    const app = await init();
    const repos = await app.listRepos();
    console.log(`repos`, repos);
} 



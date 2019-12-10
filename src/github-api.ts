import { GithubApiConfig } from '@/config';
import { onErr, getContext, instance } from './runner';
import { AxiosInstance } from 'axios';


//TRY: instance as global, else as import
//declare let instance: AxiosInstance

export class GithubApi {
    username: string;
    constructor(config: GithubApiConfig) {
        this.username = config.credentials.username;
    }
    setDefaultErrorHandler() {
    }
    instance() {
        return instance
        //return getContext().instance;
    }
    async getRepos(opts?) {
        const res = await this.instance().get(`users/${this.username}/repos`); //.catch(onErr);
        if (res) {
            const r: Repo[] = res.data;
            return r;
        }
    }
    async createRepo(repoInit: any) {
        //const opts: 
        const res = await this.instance().post(`user/repos`, repoInit).catch(onErr);
        if (res) {
            const r: GithubResult = res.data;
            return r;
        }
    }
    async deleteRepo(repoName: string) {
        //const opts: 
        const res = await this.instance().delete(`repos/${this.username}/${repoName}`).catch(onErr);
        if (res) {
            const r: GithubResult = res.data;
            return r;
        }
    }
    async getSelf() {
        return this.instance().get(`users/${this.username}`).then(r => r.data);
    }
}

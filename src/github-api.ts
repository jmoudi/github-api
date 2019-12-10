import { GithubApiConfig } from '@/config';
import { ctx, onErr } from './runner';
export class GithubApi {
    username: string;
    constructor(config: GithubApiConfig) {
        this.username = config.credentials.username;
    }
    setDefaultErrorHandler() {
    }
    instance() {
        return ctx.instance;
    }
    async getRepos(opts?) {
        const res = await this.instance().get(`users/${this.username}/repos`); //.catch(onErr);
        if (res) {
            const r: Repo[] = res.data;
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

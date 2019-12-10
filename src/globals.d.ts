
type Action = <T = any>(...args: T[]) => void|Promise<void>;
type Callback = (...args: any[]) => any;

declare interface Context {
    instance: AxiosInstance;
    debug: boolean;
    env: object
}
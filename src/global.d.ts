
type Action = <T = any>(...args: T[]) => void|Promise<void>;
type Callback = (...args: any[]) => any;
export interface Params {
    exec: Function;
    callback?: Function;
    keepAlive?: boolean;
}
export declare const run: (exec: Function | Params, ...args: any[]) => Promise<{}>;

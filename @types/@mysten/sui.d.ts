declare module '@mysten/sui' {
    export class JsonRpcProvider {
      constructor(connection: any);
      getCoins(params: { owner: string }): Promise<any>;
      getRpcApiVersion(): Promise<string>;
    }
  
    export const devnetConnection: any;
  }
  
declare namespace NodeJs{
    interface processEnv{
        secret:string,
        port:number,
        DATABASE_URL:string,
    }
}
import { Logs } from "selenium-webdriver";

// browser console
// email
// db
export interface ILogger{
    Log();
}
export class BaseLogger implements ILogger{
    Log(){
      
    }
}
export class ConsoleLogger extends BaseLogger{
    Log(){
        console.log("Using console logger");
    }
}
export class DbLogger extends BaseLogger{
    Log(){
        console.log("using Db logger");
    }
}
export class FileLogger extends BaseLogger{
    Log(){
        console.log("using file logger");
    }
}
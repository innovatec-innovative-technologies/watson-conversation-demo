import * as express from "express";
import { ServerConfig } from "./../../config/config";

export class ErrorUtils {

    static errorHandlerMiddleware(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log(ServerConfig.LOG_PREFIX, err);
        res.status(err.status || 500);
        next(err);
    }

    static onError(error: any) {
        if (error.syscall !== "listen") {
            throw error;
        }

        var bind = typeof ServerConfig.PORT === "string" ? "Pipe " + ServerConfig.PORT : "Port " + ServerConfig.PORT;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}
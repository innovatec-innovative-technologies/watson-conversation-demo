
import * as express from 'express';
import * as request from 'request';
import { ServerConfig } from "../../../config/config";
import { ParsedAsJson } from "body-parser";

declare function require(path: string): any;
const ConversationV1 = require('watson-developer-cloud/conversation/v1');

export class ConversationRouter {
    router: express.Router;

    constructor() {
        this.configRouter();
    }

    private configRouter() {
        //create a router for api routes
        this.router = express.Router();

        // setup the client for the watson conversation service
        const conversationClient = new ConversationV1({
            url: 'https://gateway.watsonplatform.net/conversation/api',
            username: ServerConfig.CONVERSATION_API_USERNAME,
            password: ServerConfig.CONVERSATION_API_PASSWORD,
            version_date: '2017-05-26',
            version: 'v1'
        });

        // Add service endpoint allowing clients to interact with the bot
        this.router.post('/message', function (req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction) {
            try {
                console.log(ServerConfig.LOG_PREFIX, "Incoming Request: ", req.body.input);
                var workspace = ServerConfig.CONVERSATION_API_WORKSPACE_ID;
                if (!workspace) {
                    console.log(ServerConfig.LOG_PREFIX, "No workspace detected. Cannot run the Watson Conversation service.");
                    res.json({
                        output: {
                            text: 'Conversation initialization in progress. Please try again.'
                        }
                    });
                }

                let params = {
                    workspace_id: workspace,
                    context: {}, // Null context indicates new conversation
                    input: {}    // Holder for message
                };

                // Set input message and context if available
                if (req.body) {
                    if (req.body.input) {
                        params.input = req.body.input;
                    }

                    if (req.body.context) {
                        params.context = req.body.context;
                    }
                }

                // Send message to the conversation service with the current context
                conversationClient.message(params, function (err: any, response: any) {
                    if (err) {
                        console.log(ServerConfig.LOG_PREFIX, "Error when sending message: ", err);
                        res.status(err.code || 500).json(err);
                    }
                    res.json(response);
                });
            } catch (e) {
                res.json({
                    output: {
                        text: e
                    }
                });
            }
        });
    }

    public getRouter(): express.Router {
        return this.router;
    }
} 
import Bing from "./Provider/Bing";
import ChatBase from "./Provider/ChatBase";
import GPT from "./Provider/GPT";

interface Providers {
    [key: string]: ChatBase | Bing | GPT;
}

const providers: Providers = {
    GPT: new GPT(),
    ChatBase: new ChatBase(),
    Bing: new Bing()    
};

const models: { [key in keyof Providers]: string[] } = {
    GPT: [
        "gpt-4",
        "gpt-4-0613",
        "gpt-4-32k",
        "gpt-4-0314",
        "gpt-4-32k-0314",
        "gpt-3.5-turbo",
        "gpt-3.5-turbo-16k",
        "gpt-3.5-turbo-0613",
        "gpt-3.5-turbo-16k-0613",
        "gpt-3.5-turbo-0301",
        "text-davinci-003",
        "text-davinci-002",
        "code-davinci-002",
        "gpt-3",
        "text-curie-001",
        "text-babbage-001",
        "text-ada-001",
        "davinci",
        "curie",
        "babbage",
        "ada",
        "babbage-002",
        "davinci-002"
    ],
    ChatBase: ["gpt-3.5-turbo"],
    Bing: ["gpt-4"]
};

export { providers, models };

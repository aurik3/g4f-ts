import axios from 'axios';
import { IMessage } from '../interfaces/IMessage';
import { createProxyConfig } from '../util/util';
import { handleStream } from '../util/stream';
import { IOptions } from '../interfaces/IOptions';

class Bing {
    name: string;
    default_model: string;
    url: string;
    supports_message_history: boolean;
    need_slice_text: boolean;
    working: boolean;

    constructor() {
        this.name = "Bing",
        this.default_model = "gpt-4",
        this.url = "https://nexra.aryahcr.cc/api/chat/complements";        
        this.supports_message_history = true;
        this.need_slice_text = true;
        this.working = false;
    }

    /**
     * Asynchronously generates a chat response based on input messages.
     * @param {Array} messages - An array of messages for the chat.
     * @param {string} proxy - Optional proxy string for additional configuration.
     * @returns {Promise<object>} - A promise that resolves with the generated chat result as a object
     * @throws {Error} - Throws an error if fetching data fails.
     */
    async createAsyncGenerator(messages:IMessage[], options:IOptions, proxy?:string): Promise<object> {
        const headers = {
            'Content-Type': 'application/json'
        }
          
        const data = {
            messages,
            "conversation_style": "Balanced",
            "markdown": false,
            "stream": options.stream || false,
            "model": "Bing"
        };
        
        return axios.post(this.url, data, {
            headers: headers, proxy: createProxyConfig(proxy),
            responseType: options.stream ? 'stream' : 'text'
        }).then(async response => {
            return handleStream({ data: response.data, name: this.name }, options.stream || false, this.handleResponse);       
        }).catch((e) => {
            if (e.message.startsWith("Invalid response.")) throw new Error(e.message);
            throw new Error("Failed to fetch data. Please try again later.");          
        });
    }

    handleResponse(text:string) {
        if (typeof text !== "string")
          throw new Error("Invalid response. Please try again later.");
        if (text.includes(`"finish":true`))
          return "";
        let match = text.match(/"message":"(.*?)","original":/);
        let content = match ? match[1] : null;
        return content;
      }
}

export default Bing;
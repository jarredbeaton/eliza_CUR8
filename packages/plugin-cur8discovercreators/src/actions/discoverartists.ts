import {
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
    type Action,
} from "@elizaos/core";

export const discoverArtists: Action = {
    name: "DISCOVER_ARTISTS",
    //similes: ["ANYONE"],
    validate: async (_runtime: IAgentRuntime, _message: Memory) => {
        return true;
    },
    description: "Discover Artists",
    handler: async (
        _runtime: IAgentRuntime,
        _message: Memory,
        _state: State,
        _options: { [key: string]: unknown },
        _callback: HandlerCallback
    ): Promise<boolean> => {
        let responseText = '';
        let images = [];
        try {
            const url = 'https://api.cur8.io/category/filter/community-group?categoryId=art&isHomePage=true';
            const response = await fetch(url);
            let json = await response.json();
            if (json?.data?.list?.length > 0)
            {
                json.data.list.map(a=> {
                    if (images.length < 3)
                    {
                        responseText += `${a.name}\r\n`;
                        images.push({
                            id: images.length.toString(),
                            url: a.displayPicture,
                            title: "Generated image",
                            source: "imageGeneration",
                            description: "...", //caption.title,
                            text: "...", //caption.description,
                            contentType: "image/png",
                        })
                    }
                })
            }
        } catch (error) {
            responseText = 'Error ' + error.message;
            console.error('Error:', error.message);
            _callback({
                text: responseText
            });
        }

        _callback({
            text: responseText,
            attachments: images,
        },
        images.map(a=>{
            return {
                attachment: a.url,
                name: `${a.url}.png`,
            }
        })
        );

        return true;
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "Can you show me some artists on cur8?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Sure, looking through our files right now...",
                    action: "DISCOVER_ARTISTS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Who are some new popular artists on cur8?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Having a look for popular artists now...",
                    action: "DISCOVER_ARTISTS",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Show me some new artists on cur8?" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Finding some new artists for you now...",
                    action: "DISCOVER_ARTISTS",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
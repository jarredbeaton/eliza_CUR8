import { Plugin } from "@elizaos/core";
import { discoverArtists } from "./actions/discoverartists";

// Define the plugin
export const cur8discovercreatorsPlugin: Plugin = {
  name: "Discover creators from cur8",
  description: "Ability to ask for recommended creators",
  actions: [discoverArtists],
};

export default cur8discovercreatorsPlugin;


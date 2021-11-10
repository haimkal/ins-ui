import { development } from "./development";
import { production } from "./production";

let environment = development;
if (document.location.href.indexOf('localhost') === -1) {
    environment = production;
}
export default environment;
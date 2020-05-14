import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function changeURL(url) {
  history.push(url);
  window.location.reload(false);
}

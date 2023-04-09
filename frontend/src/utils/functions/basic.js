import { catchHandler } from '../error_handling/error_handling';

export const domen = process.env.REACT_APP_DOMEN;
// Fetch request functoin
// method - (string)
// url - (string)
// data - (object)

const controllers = {}; // controllers

// sending/requesting function
export async function sendData(method, url, data) {
  try {
    // check existing controller for current url
    if (controllers[url]) { // if controller exist
      controllers[url]?.abort(); // stop it
      delete controllers[url]; // delete from existing

    // else controller doesn't exist
    } else {
      const controller = new AbortController(); // create it
      controllers[url] = controller; // add to existing controllers
      const response = await fetch(domen + url, {
        signal: controller.signal, // pass signal to fetch request
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
      });
      const result = await response.json();
      delete controllers[url]; // delete controller after request is done
      return result;
    }
  } catch (error) {
    catchHandler(error, 'sendData');
    return false;
  }
}

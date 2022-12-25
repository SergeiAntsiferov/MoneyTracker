import { catchHandler } from '../error_handling/error_handling';

export const domen = 'http://localhost:4001';
// Fetch request functoin
// method - (string)
// url - (string)
// data - (object)
export async function sendData(method, url, data) {
  try {
    const response = await fetch(domen + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });
    const result = await response.json();
    return result; // При успешном выполнении возвращает данные ответа от сервера в JSON формате
  } catch (error) {
    catchHandler(error, 'sendData');
  }
}

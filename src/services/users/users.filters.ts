/* eslint no-console: 1 */
console.warn('You are using the default filter for the users service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

export function filters(data, connection, hook) { // eslint-disable-line no-unused-vars
  return data;
};

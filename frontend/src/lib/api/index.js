import axios from 'axios';

export const getEvents = () => {
  return axios.get('/eveniment');
}

export const addEvents = (name) => {
  return axios.post('/eveniment', {nume: name});
}

/** detail: { location: 'constant',
 *              detail: 'blablabla',
 *                 lat: 43.23,
 *                 lot: 25.21
 *          } 
 * */
export const addDetail = (eventId, detail) => {
  return axios.post(`/eveniment/${eventId}/detalii`, 
                      {locatie: detail.location,
                        detalii: detail.detail,
                        latitudine: detail.lat,
                        longitudine: detail.lot
                      });
}

export const getDetailByEventId = (eventId) => {
  return axios.get(`/eveniment/${eventId}/detalii`);
}
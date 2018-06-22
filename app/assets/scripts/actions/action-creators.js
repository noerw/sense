import fetch from 'isomorphic-fetch';
import * as actions from './action-types';
import config from '../config';

// //////////////////////////////////////////////////////////////////////////
// // Fetch Section Access Thunk

function requestSensorData (sensor) {
  return {
    type: actions[`REQUEST_SENSOR_DATA_${sensor.toUpperCase()}`]
  };
}

function receiveSensorData (sensor, json) {
  return {
    type: actions[`RECEIVE_SENSOR_DATA_${sensor.toUpperCase()}`],
    data: json,
    receivedAt: Date.now()
  };
}

export function fetchSensorData (sensor, toDate) {
  return dispatch => {
    dispatch(requestSensorData(sensor));

    let sensorId = config.senseBox[`sensorId--${sensor}`];
    return fetch(`${config.api}/boxes/${config.senseBox.id}/data/${sensorId}?from-date=${toDate}`)
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(json => {
        return json.sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
      })
      .then(json => {
        dispatch(receiveSensorData(sensor, json));
        // setTimeout(() => {
        //   dispatch(receiveSensorData(sensor, json));
        // }, Math.ceil(Math.random() * 2000));
      })
      .catch(e => {
        console.log('e', e);
        return dispatch(receiveSensorData(sensor, null, 'Data not available'));
      });
  };
}

import { useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';
import dayjs from 'dayjs';

import { loadState, saveState } from './Helpers';

const globalState = {
  // Declare your global variables here
  host: 'live.dev.nightlifr.com:9090/hl/websocket',
  protocols: '',
  payload: '',
  activePayload: '0',
  payloads: [
    {id: '0', label: 'Default', payload: ''}
  ],
  response: '',
  activeResponse: '0',
  responses: [
    {id: '0', label: 'Default', response: ''}
  ],
  secure: false,
  autoConnect: false,
  connectionLog: [{
    datetime: dayjs().format('YYYY-MM-DD hh:mm:ss A'),
    message: `App started`
  }]
};

// Returns state from localstorage if exists
const useLocalState = () => {
  const [processedState, setProcessedState] = useState((loadState() || globalState));
  useEffect(() => {
    saveState(processedState);
  }, [processedState]);
  return [processedState, setProcessedState];
};

export const { Provider, useTracked } = createContainer(useLocalState);

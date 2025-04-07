import { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as ActionCable from '@rails/actioncable';

const CableContext = createContext(null);

export const CableProvider = ({ children }) => {
  const [cableInstance, setCableInstance] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const token = localStorage.getItem('access-token');

    const cableConnection = ActionCable.createConsumer(
      `ws://localhost:3000/cable?uid=${uid}&client=${client}&access-token=${token}`
    );
    
    setCableInstance(cableConnection);

    return () => {
      cableConnection.disconnect();
    };
  }, []);

  return (
    <CableContext.Provider value={cableInstance}>
      {children}
    </CableContext.Provider>
  );
};

export const useCable = () => useContext(CableContext);

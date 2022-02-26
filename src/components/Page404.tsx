import React from 'react';

import notFound from './assets/page404png.png';

import { ComponentReturnType } from 'types/ComponentReturnType';

export const Page404 = (): ComponentReturnType => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
    }}
  >
    <img src={notFound} alt="404" />
  </div>
);

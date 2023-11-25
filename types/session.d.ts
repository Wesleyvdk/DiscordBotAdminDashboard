interface CustomJWT {
  accessToken?: string;
}

import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

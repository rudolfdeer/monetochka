import {IPV4_ADRESS} from '@env';

const base = `http://${IPV4_ADRESS}:3000`;

export const apiBase = `${base}/api/user`;
export const socketsBase = `${base}/events`;
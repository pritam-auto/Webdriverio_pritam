import { type EnvironmentConfig } from "../../environment/environment.type";

const ENVIRONMENTS: { [key: string]: EnvironmentConfig } = {
  QA: {
    URL: `https://qbank.accelq.com/`,
    USERNAME: `qbankadmin`,
    PASSWORD: `qbTrnPass1&`,
    MFA_SECRETKEY:''
  },
  DEV: {
    URL: `https://qbank.accelq.com/`,
    USERNAME: `qbankadmin`,
    PASSWORD: `qbTrnPass1&`,
    MFA_SECRETKEY:''
  },
  UAT: {
    URL: '',
    USERNAME: '',
    PASSWORD: '',
    MFA_SECRETKEY:''
  },
  PREPROD: {
    URL: '',
    USERNAME: '',
    PASSWORD: '',
    MFA_SECRETKEY:''
  }
} as const;

export type Environment = keyof typeof ENVIRONMENTS;

export const CREDENTIAL_MANAGER = ENVIRONMENTS;

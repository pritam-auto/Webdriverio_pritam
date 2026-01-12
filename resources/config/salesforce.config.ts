import { type EnvironmentConfig } from "../../environment/environment.type";

const ENVIRONMENTS: { [key: string]: EnvironmentConfig } = {
  SALESFORCE: {
    URL: `https://login.salesforce.com/`,
    USERNAME: `saikat@cloudkaptan.com.dev`,
    PASSWORD: `Sat112025`,
    MFA_SECRETKEY:`MATTETWT3PDIBZ34YERDWE7PEUALCIPA`
  }
  
} as const;

export type Environment = keyof typeof ENVIRONMENTS;

export const CREDENTIAL_MANAGER = ENVIRONMENTS;
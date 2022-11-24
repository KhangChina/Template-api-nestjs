/**
 * Author : khang.nguyen@htgsoft.com
 * Setup : 22/08/2022
 */

 const authConstants = {
    jwt: {
      secret: 'superSecurity',
      expirationTime: {
        accessToken: '300s',
        refreshToken: '7d'//'7d',
      },
      secrets: {
        accessToken: '283f01ccce922bcc2399e7f8ded981285963cec349daba382eb633c1b3a5f282',
        refreshToken: 'c15476aec025be7a094f97aac6eba4f69268e706e603f9e1ec4d815396318c86',
      },
    },
    mailer: {
      verifyEmail: {
        subject: 'Email Verification',
        template: `${process.cwd()}/dist/templates/verify-password`,
      },
      createNewPassword: {
        subject: 'Create Password',
        template: `${process.cwd()}/dist/templates/create-password`,
      },
      selectHost: {
        subject: 'Select Host in Platform',
        template: `${process.cwd()}/dist/templates/select-host`,
      },
    },
    mailgunConfig: {
      api: '51f39008110e6a451f887b9858de6b5f-45f7aa85-0c8ebf1b',
      domain: 'no-reply.scx.digital',
      host: 'api.mailgun.net',
    },
  };
  
  export default authConstants;
  
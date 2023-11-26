import ElasticEmail from '@elasticemail/elasticemail-client';
import 'dotenv/config';

const { ELASTIC_API_KEY, EMAIL_FROM, BASE_URL } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const apikey = defaultClient.authentications['apikey'];
apikey.apiKey = ELASTIC_API_KEY;

const api = new ElasticEmail.EmailsApi();

// const email = {
//   Recipients: {
//     To: ['maxboraod@gmail.com'],
//   },
//   Content: {
//     Body: [
//       {
//         ContentType: 'HTML',
//         Charset: 'utf-8',
//         Content: 'Test Html Type!',
//       },
//     ],
//     From: EMAIL_FROM,
//     Subject: 'Test email',
//   },
// };

const callback = function (error, data, response) {
  if (error) {
    console.error(error.message);
  } else {
    console.log('API called successfully.');
    console.log('Email sent');
  }
};

export const sendEmail = (mailTo, verificationCode) => {
  const email = {
    Recipients: {
      To: [mailTo],
    },
    Content: {
      Body: [
        {
          ContentType: 'HTML',
          Charset: 'utf-8',
          // Content: 'Your registration successfull!',
          Content: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}" target="_blank">Click verify email</a>`,
        },
      ],
      From: EMAIL_FROM,
      Subject: 'Verify email',
    },
  };

  return api.emailsTransactionalPost(email, callback);
};

// sendEmail('maxboraod@gmail.com', 'asdasdasd231231321');

// import ElasticEmail from '@elasticemail/elasticemail-client';
// import 'dotenv/config';

// const { ELASTIC_API_KEY, EMAIL_FROM } = process.env;

// const defaultClient = ElasticEmail.ApiClient.instance;

// const { apikey } = defaultClient.authentications;
// apikey.apiKey = ELASTIC_API_KEY;

// const api = new ElasticEmail.EmailsApi();

// const email = ElasticEmail.EmailMessageData.constructFromObject({
//   Recipients: [new ElasticEmail.EmailRecipient('maxborassd@ukr.net')],
//   Content: {
//     Body: [
//       ElasticEmail.BodyPart.constructFromObject({
//         ContentType: 'HTML',
//         Content: '<strong>Test email</strong>',
//       }),
//     ],
//     Subject: 'Test email',
//     From: EMAIL_FROM,
//   },
// });

// const callback = function (error, data, response) {
//   if (error) {
//     console.error(error.message);
//   } else {
//     console.log('API called successfully.');
//   }
// };

// api.emailsPost(email, callback);

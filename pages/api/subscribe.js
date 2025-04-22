const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_SERVER,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { emailAdress } = req.body;

  if (!emailAdress || emailAdress.length < 3) {
    return res.status(400).json({
      flash: {
        type: 'error',
        title: 'Something was wrong',
        message: 'Your email address does not appear to be valid.',
        time_to_show: 6000,
      },
    });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
      email_address: emailAdress,
      status: 'subscribed',
    });

    return res.status(200).json({
      flash: {
        type: 'success',
        title: 'Success!',
        message: 'Your Email was successfully registered.<br>Thank you!'
      },
    });
  } catch (err) {
    return res.status(500).json({
      flash: {
        type: 'error',
        title: 'Something was wrong',
        message: 
          'Something didn’t work. Your address has not been registered!'
      },
    });
  }
}
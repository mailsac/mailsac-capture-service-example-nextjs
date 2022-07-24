const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  let emailEnvelope = JSON.parse(req.body)
  if (
        req.method === 'POST' 
        && typeof(emailEnvelope.to) !== 'undefined' 
        && emailEnvelope.to !== ''
  ){
    const mailsaUserName = process.env.MAILSAC_USERNAME
    const mailsacAPIKey  = process.env.MAILSAC_API_KEY
  
    const transporter = nodemailer.createTransport({
      host: 'capture.mailsac.com',
      port: 5587,
      // will use TLS by upgrading later in the connection with STARTTLS
      secure: false,
      auth: {
        user: mailsaUserName,
        pass: mailsacAPIKey
      }
    })
  
    try {
      const results = await transporter.sendMail({
        from: '"Sample App" no-reply@example.com',
        to: emailEnvelope.to,
        subject: 'Sample App Send',
        text: emailEnvelope.body
      })
      res.status(200).json(
        { 
          message: "You should now see an email in Mailsac's capture service", 
          response: results.data 
        }
      )
    } catch (error){
      res.status(500).json({ message: `${error.response}`, response: error })
    }
  } else {
    return res.status(200).json({message: "No data"});
  }
}
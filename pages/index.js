import { useEffect, useState } from "react";
import Notification from "../components/notifications";

export default function Index() {
  const [sentEmail, setSentEmail] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailBody,setEmailBody] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const sendEmail = () => {
    setSentEmail(true);
  }

  useEffect( () => {
    fetch('/api/send-email',{
      method: 'POST',
      body: JSON.stringify({ to: emailTo, body: emailBody})
    })
    .then( res => res.json())
    .then(response => {
      setResultMessage(response.message)
    })
    .catch(error => console.log(error));    

  },[sentEmail]);

  const SentEmailBanner = sentEmail === true? <Notification message={resultMessage} /> : null;

  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600">Deploy faster</h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
         Let&apos;s send a sample email 
        </p>
        {SentEmailBanner}
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          This email will be captured by the capture service
        </p>
        <div className="mt-8">
          <div className="flex justify-center">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="mt-5 sm:flex sm:items-center">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@mailsac.com"
                      onChange={e => setEmailTo(e.target.value)}
                    />
                    <label htmlFor="comment" className="sr-only">
                      Email Body
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        defaultValue={''}
                        placeholder="Text to send"
                        onChange={e => setEmailBody(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={sendEmail}
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

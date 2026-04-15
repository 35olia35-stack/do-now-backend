import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  res.status(200).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Privacy Policy</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 0 16px;
            line-height: 1.6;
            color: #111;
          }
          h1, h2 {
            line-height: 1.3;
          }
        </style>
      </head>
      <body>
        <h1>Privacy Policy</h1>
        <p>Effective date: April 15, 2026</p>

        <p>
          Do Now: Water & Eye Breaks respects your privacy. This Privacy Policy explains
          what information we collect, how we use it, and your choices.
        </p>

        <h2>Information We Collect</h2>
        <p>
          The app may collect a device-based user ID and trial-related information in order
          to provide access to the app during the free trial period and after purchase.
        </p>
        <p>
          If you make a purchase, billing is handled by Google Play. We do not collect or
          store your full payment card information.
        </p>

        <h2>How We Use Information</h2>
        <p>We use information to:</p>
        <ul>
          <li>provide and maintain app access;</li>
          <li>manage the free trial period;</li>
          <li>recognize whether full access has been purchased;</li>
          <li>improve app functionality and stability.</li>
        </ul>

        <h2>Data Sharing</h2>
        <p>
          We do not sell your personal information. Data may be processed by service providers
          used to operate the app, such as backend hosting, database, analytics, and app store
          billing services.
        </p>

        <h2>Data Retention</h2>
        <p>
          We keep data only as long as reasonably necessary to provide the app and related services.
        </p>

        <h2>Your Choices</h2>
        <p>
          You may stop using the app at any time. You may also contact us regarding privacy-related
          questions or requests.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us at:
          your-email@example.com
        </p>

        <h2>Changes</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted on this page.
        </p>
      </body>
    </html>
  `);
}

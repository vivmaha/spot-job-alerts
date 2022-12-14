A bot that scrapes the Spotify Career's site and sends me a daily email for new openings.

`npm run deploy` to deploy to AWS.

Implementation:

- The 'scrape' lambda is set up to run daily. It
  - hits the Spotify endpoint for a full list of current openings
  - filter this list down to engineering manager positions, remote in US
  - compares the openings against the previous openings (stored in S3 from the previous run)
  - sends an email (via AWS SES) if there are new openings
  - stores the openings in S3 (so that the next run can use it for comparison)

Stack:

- Serverless Framework for IaC
- Typescript
- AWS (S3, Lambda, SES)

TODO:

- Detect when jobs response format is no longer compatible with our scraper and send an alert
- Include job description in email
- Include other companies
- Nicer HTML formatting for email
- Add ML detection for job requirement of prior management experience, and filter based on this
- ESLint
- Deployment via GitHub Actions

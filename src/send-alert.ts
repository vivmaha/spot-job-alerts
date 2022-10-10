import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// intentionally split so that scrapers don't spam it.
const toAddress = "vivmaha" + "@" + "gmail" + ".com";
const fromAddress = "vivmaha.bot" + "@" + "gmail" + ".com";

function getMessage(newJobs: SpotJob[]) {
  let message = "";
  message += `There are ${newJobs.length} new job(s)\n\n\n`;
  for (const job of newJobs) {
    const url = ``;
    message += `${job.text}\n${url}\n`;
    message += `https://www.lifeatspotify.com/jobs/${job.id}\n\n`;
  }
  message += `Good luck!\n`;
  message += `- V Bot\n`;
  return message;
}

export async function sendAlert(newJobs: SpotJob[]): Promise<void> {
  if (newJobs.length === 0) {
    console.log("No new jobs... not sending alert.");
    return;
  }

  const body = getMessage(newJobs);

  console.log(`Sending alert \n ${body.substring(0, 200)}...`);

  const sesClient = new SESClient({});
  await sesClient.send(
    new SendEmailCommand({
      Source: fromAddress,
      Destination: {
        ToAddresses: [toAddress],
      },
      Message: {
        Subject: {
          Data: "Alert - New Spotify Jobs",
        },
        Body: {
          Text: {
            Data: body,
          },
        },
      },
    })
  );
}

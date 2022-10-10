import { getCurrentJobs } from "./current-jobs";
import { getPreviousJobs, setPreviousJobs } from "./previous-jobs";

function getNewJobs(
  previous: SpotJobSearch,
  current: SpotJobSearch
): SpotJob[] {
  const newJobs: SpotJob[] = [];
  const previousSet = new Set(previous.result.map((job) => job.id));
  for (const job of current.result) {
    if (!previousSet.has(job.id)) {
      newJobs.push(job);
    }
  }
  return newJobs;
}

export async function scrape() {
  const [previous, current] = await Promise.all([
    getPreviousJobs(),
    getCurrentJobs(),
  ]);

  if (previous !== undefined) {
    const newJobs = getNewJobs(previous, current);
    await sendAlert(newJobs);
  }

  await setPreviousJobs(current);
}

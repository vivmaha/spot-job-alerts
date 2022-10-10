import fetch from "node-fetch";

export async function getCurrentJobs(): Promise<SpotJobSearch> {
  const url = `https://api-dot-new-spotifyjobs-com.nw.r.appspot.com/wp-json/animal/v1/job/search?c=engineering`;

  const response = await fetch(url);
  const jobs = (await response.json()) as SpotJobSearch;

  console.log(`Found ${jobs.result.length} total jobs.`);

  const filteredJobs: SpotJobSearch = {
    ...jobs,
    result: jobs.result.filter(
      (j) =>
        j.sub_category.slug === "engineering-leadership" &&
        j.remote_name.slug === "remote-americas"
    ),
  };

  console.log(`Found ${jobs.result.length} EM and Remote AMER jobs.`);

  return filteredJobs;
}

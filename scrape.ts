import fetch from "node-fetch";

async function main() {
  type SpotJob = {
    id: string; // eg. "staff-machine-learning-engineer-freemium",
    text: string; // eg. "Staff Machine Learning Engineer, Freemium",
    sub_category: {
      slug: string; // eg. "engineering-leadership"
    };
    is_remote: boolean; // true
    remote_name: {
      slug: string; // eg. "remote-americas"
    };
  };

  type SpotJobSearch = {
    result: SpotJob[];
  };

  const url = `https://api-dot-new-spotifyjobs-com.nw.r.appspot.com/wp-json/animal/v1/job/search?c=engineering`;

  const response = await fetch(url);
  const jobSearch = (await response.json()) as SpotJobSearch;
  const jobs = jobSearch.result;

  console.log(`Found ${jobs.length} jobs`);

  const emJobs = jobs.filter(
    (j) =>
      j.sub_category.slug === "engineering-leadership" &&
      j.remote_name.slug === "remote-americas"
  );

  console.log(`Found ${emJobs.length} em jobs`);
}

main().then(
  () => {
    console.log("done");
  },
  (e) => {
    console.log(e);
  }
);

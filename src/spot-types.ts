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

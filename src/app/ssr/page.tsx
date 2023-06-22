type Repo = {
  name: string;
  stargazers_count: number;
};

async function fetchData(): Promise<Repo> {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  return res.json();
}

export default async function SSR() {
  const repo = await fetchData();
  return (
    <>
      <section>
        <h1>{repo.name}</h1>
        <p>{repo.stargazers_count}</p>
      </section>
    </>
  );
}

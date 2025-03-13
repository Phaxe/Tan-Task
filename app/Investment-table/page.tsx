import InvestmentsTable from "./InvestmentTable";



const getData = async () => {
  const url = process.env.NEXT_PUBLIC_MAIN_URL;
  if (!url) throw new Error("NEXT_PUBLIC_MAIN_URL is not defined");
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

export default async function Page() {
  const data = await getData(); // Fetch data on the server

  return <InvestmentsTable investments={data} />;
}


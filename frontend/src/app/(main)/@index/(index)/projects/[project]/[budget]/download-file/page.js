import useSWR from 'swr'
 
const fetcher = (...args) => fetch(...args).then((res) => res.json())
 
async function page(params) {
    console.log(params);
   let  {project,budget} = params.params;
  const { data, error } = useSWR(`/api/${project}/download/${budget}`, fetcher)
 
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
 
  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
      <p>{data}</p>
    </div>
  )
}
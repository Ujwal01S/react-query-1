// 'https://jsonplaceholder.typicode.com/todos' for get
// 'https://jsonplaceholder.typicode.com/posts' for post/mutation
import { useQuery, useMutation } from '@tanstack/react-query';

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
    res.json()
    ),
  });

  const { mutate, isPending, isError, isSuccess} = useMutation({
    mutationFn: (newPost) => 
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset = UTF-8'
        },
      }).then((res) => res.json()),
  });

  if(error || isError) return <h1>There was an Error!</h1>

  if(isLoading) return <h3>Loading................</h3>

  return (
    <div className="App">
      {isPending && <p>Data is being added</p>}
      <button onClick={() => {
        mutate({
          userId: 5000,
          id: 4200,
          title: 'Demo on Mutate',
          body: 'This is body part',
        })
      }}>
        Add post
      </button>
      {data?.map((todo) => (
        <>
        <h4>ID: {todo.id}</h4>
        <h4>TTITLE: {todo.title}</h4>
        <h4>TTITLE: {todo.body}</h4>
        </>
      ))}
    </div>
  );
}

export default App;

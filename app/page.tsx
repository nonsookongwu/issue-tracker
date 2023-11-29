import Image from 'next/image'
import Pagination from './components/Pagination';

interface Props{
  searchParams: {page:string}
}

export default function Home({searchParams}:Props) {
  return (
    <div>
      <h1> Hello world</h1>

      <Pagination currentPage={+searchParams.page} itemCount={100} pageSize={10}/>
    </div>
  );
}

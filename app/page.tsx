import Image from 'next/image'
import Pagination from './components/Pagination';

export default function Home() {
  return (
    <div>
      <h1> Hello world</h1>

      <Pagination currentPage={2} itemCount={100} pageSize={10}/>
    </div>
  );
}

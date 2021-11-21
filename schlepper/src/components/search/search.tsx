import { useState } from 'react';
import './search.css';
import apiService from '../../APIservice';
import ReleaseMini from '../search-minis/release-mini/release-mini';
import { Album } from '../../interfaces/Album';

const Search: React.FC = () => {
  //state
  const [searchQuery, changeSearchQuery] = useState<string>('');
  const [results, changeResults] = useState<Album[]>([]);

  //tracks search query
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const query = e.target.value;
    changeSearchQuery(query);
  }

  //sends api call to db
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const res = await apiService.search(searchQuery, 'release');
    if (res) {
      changeResults(res.results.slice(0, 30));
    }
  }

  return (
    <div className='searchContainer'>
      <h1>Search</h1>
      <div className='search-bar'>
        <form onSubmit={handleSubmit}>
          <input
            type='search'
            placeholder='Search for album...'
            name='search'
            value={searchQuery}
            onChange={handleChange}
          />
          <input type='submit' value='Search' className='button' />
          {results.length > 0 &&
            results.map(result => <ReleaseMini key={result.uri} result={result} />)}
        </form>
      </div>
    </div>
  );
};

export default Search;

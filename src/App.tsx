import { Component, type ReactNode } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';

class App extends Component {
  render(): ReactNode {
    return (
      <div className="flex min-h-screen bg-white">
        <div className="w-full max-w-7xl flex flex-col bg-gray-100 mx-auto flex-grow">
          <Header />
          <main className="flex-grow py-4 px-2 min-sm:px-4">
            <div className="flex justify-center">
              <SearchBar />
            </div>
            <h1>App</h1>
          </main>
        </div>
      </div>
    );
  }
}

export default App;

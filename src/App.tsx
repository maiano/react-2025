import { Component, type ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';

class App extends Component {
  render(): ReactNode {
    return (
      <div className="flex min-h-screen bg-white">
        <div className="w-full max-w-7xl flex flex-col bg-gray-100 mx-auto">
          <Header />
          <HomePage />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

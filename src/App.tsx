import { Component, type ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';

type AppState = {
  wouldThrow: boolean;
};

class App extends Component {
  state: AppState = {
    wouldThrow: false,
  };

  render(): ReactNode {
    const { wouldThrow } = this.state;

    if (wouldThrow) {
      throw new Error('test error from button');
    }

    return (
      <div className="flex min-h-screen bg-white">
        <div className="w-full max-w-7xl flex flex-col bg-gray-100 mx-auto">
          <Header />
          <HomePage />
          <Footer onThrowError={() => this.setState({ wouldThrow: true })} />
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import '../assets/css/App.css';

// Components
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';

function App() {
  return (
    <React.Fragment>
      <Navbar  
        links={[
          {text: 'Home', url: '/'},
          {text: 'Services', url: '/services'},
          {text: 'Products', url: '/products'},
          {text: 'Contact', url: '/contact'},
          {text: 'About Us', url: '/about'},
          {text: 'Stores', url: '/stores'},
        ]}
      />

      <Home />

      <Footer>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores exercitationem tenetur alias iste facere. Quod est ratione doloribus molestiae, mollitia ducimus provident eveniet hic distinctio perspiciatis dolores adipisci illum cupiditate.</p>
        <Navbar
          links={[
            { text: 'Home', url: '/' },
            { text: 'Services', url: '/services' },
            { text: 'Products', url: '/products' }
          ]}
        />
      </Footer>

    </React.Fragment>
  );
}

export default App;
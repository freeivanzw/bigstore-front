import css from './Home.module.css';
import Container from '../../components/Container/Container';
import Types from '../../components/Types/Tyeps';
import Brands from '../../components/Brands/Brands';
import Catalog from '../../components/Catalog/Catalog';

const Home = () => {
  return <>
    <Container>
      <Brands />
      <Types />
      <Catalog />
    </Container>
  </>
}

export default Home;
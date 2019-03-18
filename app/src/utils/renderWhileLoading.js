import { branch, renderComponent } from 'recompose';
import Loading from '../components/Loading';

export default branch(({ loading }) => loading, renderComponent(Loading));

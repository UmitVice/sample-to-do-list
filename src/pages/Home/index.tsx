import './home.scss';
import TodoList from 'components/TodoList';

const Home = () => {
  return (
    <div className="todo-container">
        <TodoList />
    </div>
  );
};

export default Home;
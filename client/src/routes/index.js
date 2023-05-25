import Home from '../pages/Home';
import Irregular from '../pages/Irregular';
import Note from '../pages/Note';
import GameDetail from '../pages/GameDetail';

// Public routes
const publicRoutes = [
  { name: "Home", path: '/', component: Home },
  { name: "Irregular", path: '/irregular-verb', component: Irregular },
  { name: "Note", path: '/note', component: Note },
  { name: "Detail", path: `detail/:id`, component: GameDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

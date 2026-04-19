import { lazy, Suspense, type JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import './index.scss';
import { AuthProvider } from './provider/AuthProvider';
import { CartProvider } from './provider/CartProvider';

const Home = lazy(() =>
  import('./features/Home/Home').then((module) => ({ default: module.Home }))
);

const BookDetailContainer = lazy(() =>
  import('./features/BookDetailContainer/BookDetailContainer').then((module) => ({ default: module.BookDetailContainer }))
);
const Login = lazy(() =>
  import('./features/Auth/Login/Login').then((module) => ({ default: module.Login }))
);

const Register = lazy(() =>
  import('./features/Auth/Register/Register').then((module) => ({ default: module.Register }))
);

const Explore = lazy(() => import('./features/Explore/Explore').then((module) => ({default: module.Explore})))

const CartPage = lazy(() => import('./features/CartPage/CartPage'));

const Profile = lazy(() => import('./features/Profile/Profile').then((module) => ({ default: module.Profile })));

const ProfileInfo = lazy(() => import('./features/Profile/ProfileInfo').then((module) => ({ default: module.ProfileInfo })));

const ProfileReservations = lazy(() => import('./features/Profile/ProfileReservations').then((module) => ({ default: module.ProfileReservations })));

const ProfileCart = lazy(() => import('./features/Profile/ProfileCart').then((module) => ({ default: module.ProfileCart })));

function App(): JSX.Element {
  return (
    <>
      <AuthProvider>
        <CartProvider>
        <Header />
        <Suspense fallback={<div className="loading-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetailContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/explore" element={ <Explore/> } />
            <Route path="/my-books" element={<h2>My Books Section</h2>} />
            <Route path="/cart" element = {<CartPage/>}/>
            <Route path="/profile" element={<Profile />}>
              <Route path="info" element={<ProfileInfo />} />
              <Route path="reservations" element={<ProfileReservations />} />
              <Route path="cart" element={<ProfileCart />} />
            </Route>
            <Route path="*" element={<h2>404 - Page not found</h2>} />
          </Routes>
        </Suspense>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
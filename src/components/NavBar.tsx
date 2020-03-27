import React from 'react'
import { useAuth0 } from '../auth/react-auth0-spa';
import { Link } from 'react-router-dom';

const authBtnClass = "text-sm p-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white"

export const SignOutBtn = (logout: () => void) => 
  <button
    className={authBtnClass}
    onClick={logout}
  >
    Log out
  </button>

export const SignInBtn = (loginWithRedirect: () => void) =>
    <button
      className={authBtnClass}
      onClick={loginWithRedirect}
    >
      Sign In
    </button>

export const NavBar : React.FC<{}> = (props) => {
  
  const {isAuthenticated, isInitializing, loginWithRedirect, logout} = useAuth0()

  if (isInitializing) return <div>...Loading</div>

  const authBtn = isAuthenticated ? SignOutBtn(logout) : SignInBtn(loginWithRedirect)

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-red-900 p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl italic tracking-tight">Boilerplate</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to='General' href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Protected Route
          </Link>
        </div>
        <div>
          <div className="inline-block lg:mt-0">
            {authBtn}
          </div>
        </div>
      </div>
      </nav>
      {props.children}
    </>
  )
}
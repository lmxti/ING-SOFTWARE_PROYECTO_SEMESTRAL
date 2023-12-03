import ShowUser from './ShowUser';

const NavBar = () => {
    return (
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-white text-xl font-bold">Municipalidad</a>

          <ul className="flex items-center space-x-4">
            <li>
              <ShowUser/>
            </li>
          </ul>
        </div>
      </nav>
    )


}

export default NavBar;
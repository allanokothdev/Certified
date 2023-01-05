import { Link } from 'react-scroll'

export function NavLink({ path, label, children, ...rest}) {
  return (
    <Link
      to={path}
      spy={true}
      offset={-70}
      smooth={true}
      duration={500}
      className="nav-item"
      activeClass="active"
      {...rest}
    >
      {label}
    </Link>
  )
}